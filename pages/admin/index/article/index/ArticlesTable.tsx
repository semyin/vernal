import { startTransition, useCallback, useState } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { withFallback } from "vike-react-query";
import { navigate } from "vike/client/router";
import {
  message,
  Tag as AntdTag,
  Popconfirm,
  Switch,
  Button,
  Table,
} from "antd";
import { ColumnType } from "antd/es/table";
import { ArticleFilters } from "#root/api/article/type";
import { MetaData } from "#root/api/meta/type";
import {
  useUpdatePublishStatus,
  useUpdateTopStatus,
} from "#root/api/article/hooks";
import { deleteArticle, fetchManageArticles } from "#root/api/article";
import { fetchMetaByResource } from "#root/api/meta";
import { Article } from "#root/api/article/type";
import { Tag } from "#root/api/tag/type";
import { useMountedStyles } from "#root/hooks/useMountedStyles";
import { MetadataModal } from "./MetadataModal";

interface ArticlesTableProps {
  page: number;
  limit: number;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
  filters: ArticleFilters;
}

const ArticlesTable = withFallback(
  ({ page, limit, setPage, setLimit, filters }: ArticlesTableProps) => {
    const [metadataModalVisible, setMetadataModalVisible] = useState(false);
    const [currentArticleId, setCurrentArticleId] = useState<number>(0);
    const [metadata, setMetadata] = useState<MetaData[]>([]);

    const queryClient = useQueryClient();

    const { mutate: togglePublish } = useUpdatePublishStatus();
    const { mutate: toggleTop } = useUpdateTopStatus();

    const result = useSuspenseQuery({
      queryKey: ["admin-articles", page, limit, filters],
      queryFn: () =>
        fetchManageArticles({
          page,
          limit,
          title: filters.title,
          isPublished: filters.isPublished,
          isTop: filters.isTop,
          withMetas: true,
          withTags: true,
          tagIds: filters.tagIds,
          categoryIds: filters.categoryIds,
          dates: filters.dates,
        }),
    });

    const handleDelete = async (id: number) => {
      try {
        await deleteArticle(id);
        message.success("删除成功");
        queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      } catch (error) {
        message.error("删除失败");
      }
    };

    const handleMetadata = useCallback(async (id: number) => {
      setCurrentArticleId(id);
      try {
        const resourceType = "article";
        const data = await fetchMetaByResource(resourceType, id);
        const metaData: MetaData[] = data.map((item) => {
          const { id, name, content, isDefault, resourceType, resourceId } =
            item;
          return { id, name, content, isDefault, resourceType, resourceId };
        });
        setMetadata(metaData);
        setMetadataModalVisible(true);
      } catch (error) {
        console.log(error);
        message.error("获取元数据失败" + error);
      }
    }, []);

    const handleEdit = (id: number) => {
      navigate(`/admin/article/upsert/${id}`); // 跳转到编辑页面
    };

    const columns: ColumnType<Article>[] = [
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
        title: "分类",
        dataIndex: "categoryName",
        key: "categoryName",
      },
      {
        title: "标签",
        dataIndex: "tags",
        key: "tags",
        width: 200,
        render: (tags: Tag[]) => (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {tags.map((item) => (
              <AntdTag key={item.id} color="green">
                {item.name}
              </AntdTag>
            ))}
          </div>
        ),
      },
      {
        title: "是否发布",
        dataIndex: "isPublished",
        key: "isPublished",
        render: (isPublished: boolean, record: Article) => (
          <Popconfirm
            title={`确定${isPublished ? "取消发布" : "发布"}该文章吗？`}
            onConfirm={() =>
              togglePublish({ id: record.id, value: !record.isPublished })
            }
            okText="确定"
            cancelText="取消"
          >
            <Switch checked={isPublished} />
          </Popconfirm>
        ),
      },
      {
        title: "是否置顶",
        dataIndex: "isTop",
        key: "isTop",
        render: (isTop: boolean, record: Article) => (
          <Popconfirm
            title={`确定${isTop ? "取消置顶" : "置顶"}该文章吗？`}
            onConfirm={() => toggleTop({ id: record.id, value: !record.isTop })}
            okText="确定"
            cancelText="取消"
          >
            <Switch checked={isTop} />
          </Popconfirm>
        ),
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
      {
        title: "操作",
        key: "action",
        fixed: "right", // 固定在右侧
        width: 230, // 设置操作列宽度
        render: (_: unknown, record: { id: number }) => (
          <div>
            <Button type="link" onClick={() => handleEdit(record.id)}>
              编辑
            </Button>
            <Button type="link" onClick={() => handleMetadata(record.id)}>
              元数据
            </Button>
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => handleDelete(record.id)}
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
    ];

    const _s = useMountedStyles();

    return (
      <>
        <Table
          style={_s}
          bordered
          loading={result.isFetching}
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
              startTransition(() => setPage(newPage));
              startTransition(() => setLimit(newPageSize));
            },
          }}
        />
        <MetadataModal
          visible={metadataModalVisible}
          currentArticleId={currentArticleId}
          onCancel={() => setMetadataModalVisible(false)}
          metadata={metadata}
          setMetadata={setMetadata}
        />
      </>
    );
  }
);

export { ArticlesTable };
