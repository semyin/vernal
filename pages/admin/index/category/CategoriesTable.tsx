import { Category, Filters } from "#root/api/category/type";
import { Button, Popconfirm } from "antd";
import { withFallback } from "vike-react-query";


const columns = (onEdit: ({ id, name, description }: Partial<Category>) => void, onDelete: (id: number) => void) => [
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
  filters: Filters;
  onEdit: (id: number, name: string) => void;
}

const CategoriesTable = withFallback(
  ({ filters, onEdit }: CategoriesTableProps) => {
    return <></>
  }
)

export { CategoriesTable };