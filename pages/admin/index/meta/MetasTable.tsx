import { startTransition } from "react";
import { withFallback } from "vike-react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Popconfirm, Table, TableColumnType } from "antd";
import { BASE_QUERY_KEY, fetchMetas } from "#root/api/meta";
import { useDeleteMeta } from "#root/api/meta/hooks";
import { Meta, MetaFilters } from "#root/api/meta/type";
import { useMountedStyles } from "#root/hooks/useMountedStyles";

const columns = (
  onEdit: ({ id }: Partial<Meta>) => void,
  onDelete: (id: number) => void
): TableColumnType<Meta>[] => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "property",
      dataIndex: "property",
      key: "property",
    },
    {
      title: "content",
      dataIndex: "content",
      key: "content",
      width: 400
    },
    {
      title: "是否站点值",
      dataIndex: "isDefault",
      key: "isDefault",
      render: (_: unknown, record: Meta) => {
        return record.isDefault ? "是" : "否";
      }
    },
    {
      title: "资源类型",
      dataIndex: "resourceType",
      key: "resourceType",
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
      fixed: "right",
      width: 160,
      render: (_: unknown, record: Meta) => (
        <div>
          <Button type="link" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Popconfirm title="确定删除吗？" onConfirm={() => onDelete(record.id)} okText="确定" cancelText="取消">
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

interface Props {
  page: number;
  limit: number;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
  filters: MetaFilters;
  onEdit: (data: Partial<Meta>) => void;
}

const MetasTable = withFallback(
  ({ page, limit, setPage, setLimit, filters, onEdit }: Props) => {

    const queryKey = [BASE_QUERY_KEY, page, limit, filters]

    const result = useSuspenseQuery({
      queryKey,
      queryFn: () => fetchMetas({
        page,
        limit,
        name: filters.name,
        property: filters.property,
        isDefault: filters.isDefault,
        resourceType: filters.resourceType
      }),
    });

    const { mutate: deleteMeta } = useDeleteMeta(queryKey)

    const _s = useMountedStyles();

    return <Table
      style={_s}
      bordered
      loading={result.isFetching}
      dataSource={result.data.items}
      columns={columns(onEdit, deleteMeta)}
      rowKey="id"
      scroll={{ x: "max-content" }}
      pagination={{
        total: result.data.meta.totalItems,
        current: page,
        pageSize: limit,
        showTotal: (total) => `共 ${total} 条`,
        onChange: (newPage, newPageSize) => {
          startTransition(() => setPage(newPage));
          startTransition(() => setLimit(newPageSize));
        },
      }}
    />
  }
)

export { MetasTable };