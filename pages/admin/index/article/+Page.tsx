import { useSuspenseQuery } from "@tanstack/react-query";
import { Spin, Table, Tag as AntdTag } from "antd";
import { fetchManageArticles } from "#root/api/article";
import { withFallback } from "vike-react-query";
import { Suspense, useState } from "react";
import { Tag } from "#root/types/Tag";

const Page = withFallback(
  () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(1);

    const result = useSuspenseQuery({
      queryKey: ["admin-articles", page, limit],
      queryFn: () =>
        fetchManageArticles({
          page,
          limit,
          // isTop: true,
          // isPublished: false,
          withMetas: true,
          withTags: true,
        }),
    });

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
        width: 260,
      },
      {
        title: "摘要",
        dataIndex: "summary",
        key: "summary",
      },
      {
        title: "作者ID",
        dataIndex: "authorId",
        key: "authorId",
      },
      {
        title: "分类ID",
        dataIndex: "categoryId",
        key: "categoryId",
      },
      {
        title: "标签",
        dataIndex: "tags",
        key: "tags",
        width: 200,
        render: (tags: Tag[]) =>
          tags.map((item) => {
            return (
              <AntdTag key={item.id} color="green">
                {item.name}
              </AntdTag>
            );
          }),
      },
      {
        title: "是否发布",
        dataIndex: "isPublished",
        key: "isPublished",
        render: (text: boolean) => (text ? "是" : "否"),
      },
      {
        title: "是否置顶",
        dataIndex: "isTop",
        key: "isTop",
        render: (text: boolean) => (text ? "是" : "否"),
      },
      {
        title: "浏览量",
        dataIndex: "viewCount",
        key: "viewCount",
      },
      {
        title: "点赞数",
        dataIndex: "likeCount",
        key: "likeCount",
      },
      {
        title: "评论数",
        dataIndex: "commentCount",
        key: "commentCount",
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
    ];

    return (
      <Table
        bordered
        dataSource={result.data.items}
        columns={columns}
        rowKey="id"
        scroll={{ x: "max-content" }}
        pagination={{
          total: result.data.meta.totalItems,
          current: page,
          pageSize: limit,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            setLimit(newPageSize);
          },
        }}
      />
    );
  },
  () => "loading...",
  () => "loading..."
);

export { Page };
