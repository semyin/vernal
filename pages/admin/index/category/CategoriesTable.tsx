import { withFallback } from "vike-react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Popconfirm, Table, TableColumnType } from "antd";
import { fetchCategories, BASE_QUERY_KEY } from "#root/api/category";
import { useDeleteCategory } from "#root/api/category/hooks";
import { Category, CategoryFilters } from "#root/api/category/type";
import { useMountedStyles } from "#root/hooks/useMountedStyles";

const columns = (
  onEdit: ({ id, name, description }: Partial<Category>) => void,
  onDelete: (id: number) => void
): TableColumnType<Category>[] => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
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
      render: (_: unknown, record: Category) => (
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

interface CategoriesTableProps {
  filters: CategoryFilters;
  onEdit: ({ id, name, description }: Partial<Category>) => void;
}

const CategoriesTable = withFallback(
  ({ filters, onEdit }: CategoriesTableProps) => {

    const queryKey = [BASE_QUERY_KEY, filters];

    const result = useSuspenseQuery({
      queryKey,
      queryFn: () => fetchCategories({ name: filters.name }),
    });

    const { mutate: deleteCategory } = useDeleteCategory(queryKey)

    const _s = useMountedStyles();
    return <Table
      style={_s}
      bordered
      loading={result.isFetching}
      dataSource={result.data}
      columns={columns(onEdit, deleteCategory)}
      rowKey="id"
      scroll={{ x: "max-content" }}
      pagination={false}
    />
  }
)

export { CategoriesTable };