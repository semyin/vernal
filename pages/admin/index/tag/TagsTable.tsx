import { withFallback } from "vike-react-query"
import { useSuspenseQuery } from "@tanstack/react-query";
import { TableColumnType, Table, Button, Popconfirm, message } from "antd";
import { Filters, Tag } from "#root/api/tag/type";
import { useMountedStyles } from "#root/hooks/useMountedStyles";
import { fetchTags } from "#root/api/tag";
import { useDeleteTag } from "#root/api/tag/hooks";

interface TagsTableProps {
  filters: Filters;
}

const TagsTable = withFallback(
  ({ filters }: TagsTableProps) => {

    const result = useSuspenseQuery({
      queryKey: ["admin-tags", filters],
      queryFn: () => fetchTags({ name: filters.name }),
    });

    const _s = useMountedStyles()

    const { mutate: deleteTag } = useDeleteTag(filters);

    function handleEdit(id: number) { }

    const columns: TableColumnType<Tag>[] = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 80
      },
      {
        title: "名称",
        dataIndex: "name",
        key: "name",

      },
      {
        title: "创建时间",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 160,
      },
      {
        title: "更新时间",
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: 160,
      },
      {
        title: "操作",
        key: "action",
        fixed: "right", // 固定在右侧
        width: 160, // 设置操作列宽度
        render: (_: unknown, record: { id: number }) => (
          <div>
            <Button type="link" onClick={() => handleEdit(record.id)}>
              编辑
            </Button>
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => deleteTag(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        ),
      },
    ]

    return <>
      <Table
        style={_s}
        bordered
        loading={result.isFetching}
        dataSource={result.data}
        columns={columns}
        rowKey="id"
        scroll={{ x: "max-content" }}
        pagination={false}
      />
    </>
  })

export { TagsTable };