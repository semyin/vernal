import { withFallback } from "vike-react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Popconfirm, Switch, Table, TableColumnType } from "antd";
import { fetchFriendLinks } from "#root/api/friend-link";
import { useDeleteFriendLink, useToggleFriendLinkVisible } from "#root/api/friend-link/hooks";
import { FriendLink, FriendLinkFilters } from "#root/api/friend-link/type";
import { useMountedStyles } from "#root/hooks/useMountedStyles";

const columns = (
  onEdit: ({ id }: Partial<FriendLink>) => void,
  onDelete: (id: number) => void,
  toggleVisible: ({ id, value }: { id: number, value: boolean }) => void
): TableColumnType<FriendLink>[] => [
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
      title: "链接",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "头像",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "权重",
      dataIndex: "sortWeight",
      key: "sortWeight",
    },
    {
      title: "是否可见",
      dataIndex: "isVisible",
      key: "isVisible",
      render: (isTop: boolean, record: FriendLink) => (
        <Popconfirm
          title={`确定${isTop ? "取消置顶" : "置顶"}该文章吗？`}
          onConfirm={() => toggleVisible({ id: record.id, value: !record.isVisible })}
          okText="确定"
          cancelText="取消"
        >
          <Switch checked={isTop} />
        </Popconfirm>
      ),
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
      render: (_: unknown, record: FriendLink) => (
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

interface FriendLinksTableProps {
  filters: FriendLinkFilters,
  onEdit: (data: Partial<FriendLink>) => void;
}

const FriendLinksTable = withFallback(
  ({ filters, onEdit }: FriendLinksTableProps) => {
    const result = useSuspenseQuery({
      queryKey: ["admin-friendLinks", filters],
      queryFn: () => fetchFriendLinks({ name: filters.name, isVisible: filters.isVisible }),
    });

    const { mutate: deleteFriendLink } = useDeleteFriendLink(filters)
    const { mutate: toggleVisible } = useToggleFriendLinkVisible()

    const _s = useMountedStyles();
    return <Table
      style={_s}
      bordered
      loading={result.isFetching}
      dataSource={result.data}
      columns={columns(onEdit, deleteFriendLink, toggleVisible)}
      rowKey="id"
      scroll={{ x: "max-content" }}
      pagination={false}
    />
  }
)

export { FriendLinksTable };