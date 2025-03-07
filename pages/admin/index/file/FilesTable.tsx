import { startTransition } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { withFallback } from "vike-react-query";
import { Button, Popconfirm, Table, TableColumnType } from "antd";
import { fetchFiles, queryKey } from "#root/api/file";
import { File, fileFilters } from "#root/api/file/type";
import { useMountedStyles } from "#root/hooks/useMountedStyles";
import { useDeleteFile } from "#root/api/file/hooks";

const columns = (
  onDelete: (id: number) => void
): TableColumnType<File>[] => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "名称",
      dataIndex: "filename",
      key: "filename",
    },
    {
      title: "原始名称",
      dataIndex: "originalname",
      key: "originalname",
    },
    {
      title: "链接",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: 100,
    },
    {
      title: "文件类型",
      dataIndex: "mimetype",
      key: "mimetype",
    },
    {
      title: "cosKey",
      dataIndex: "cosKey",
      key: "cosKey",
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
      render: (_: unknown, record: File) => (
        <div>
          <Popconfirm title="确定删除吗？" onConfirm={() => onDelete(record.id)} okText="确定" cancelText="取消">
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

interface FilesTableProps {
  page: number;
  limit: number;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
  filters: fileFilters;
}

const FilesTable = withFallback(
  ({ page, limit, setPage, setLimit, filters }: FilesTableProps) => {

    const result = useSuspenseQuery({
      queryKey: [queryKey, filters],
      queryFn: () => fetchFiles({
        limit,
        page,
        type: filters.type
      }),
    });

    const _s = useMountedStyles();

    const { mutate: deleteFile } = useDeleteFile(filters)

    return <Table
      style={_s}
      bordered
      loading={result.isFetching}
      dataSource={result.data.items}
      columns={columns(deleteFile)}
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
  });

export { FilesTable };
