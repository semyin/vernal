import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Popconfirm, Table, TableColumnType } from "antd";
import { withFallback } from "vike-react-query"
import { fetchUsers, BASE_QUERY_KEY } from "#root/api/user";
import { User, UserFilters } from "#root/api/user/type";
import { useMountedStyles } from "#root/hooks/useMountedStyles";
import { useDeleteUser } from "#root/api/user/hooks";

const columns = (
  onEdit: ({ id }: Partial<User>) => void,
  onDelete: (id: number) => void,
): TableColumnType<User>[] => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "头像",
      dataIndex: "avatarUrl",
      key: "avatarUrl"
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "推送类型",
      dataIndex: "pushType",
      key: "pushType",
    },
    {
      title: "推送链接",
      dataIndex: "pushUrl",
      key: "pushUrl",
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
      render: (_: unknown, record: User) => (
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
  filters: UserFilters;
  onEdit: (data: Partial<User>) => void;
}

const UsersTable = withFallback(
  ({ filters, onEdit }: Props) => {

    const queryKey = [BASE_QUERY_KEY, filters]

    const result = useSuspenseQuery({
      queryKey,
      queryFn: () => fetchUsers({
        username: filters.username,
        email: filters.email,
        phone: filters.phone
      }),
    });

    const _s = useMountedStyles();
    const { mutate: deleteUser } = useDeleteUser(queryKey)

    return <Table
      style={_s}
      bordered
      loading={result.isFetching}
      dataSource={result.data}
      columns={columns(onEdit, deleteUser)}
      rowKey="id"
      scroll={{ x: "max-content" }}
      pagination={false}
    />
  }
)

export { UsersTable };