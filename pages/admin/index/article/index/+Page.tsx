import { deleteArticle, fetchManageArticles } from "#root/api/article";
import { fetchTags } from "#root/api/tag";
import { Tag } from "#root/types/Tag";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  Tag as AntdTag,
  Form,
  Input,
  Select,
  Button,
  message,
  Popconfirm,
  Switch,
  Modal,
  Empty,
} from "antd";
import { useState, startTransition, useCallback } from "react";
import { withFallback } from "vike-react-query";
import { useMountedStyles } from "#root/hooks/useMountedStyles";
import { navigate } from "vike/client/router";
import { Article } from "#root/types/Article";
import { ColumnType } from "antd/es/table";
import { fetchCategories } from "#root/api/category";
import {
  useUpdatePublishStatus,
  useUpdateTopStatus,
} from "#root/hooks/useArticleMutations";
import {
  createMeta,
  deleteMeta,
  fetchMetaByResource,
  updateMeta,
} from "#root/api/meta";
import React from "react";

interface Filters {
  title?: string;
  isPublished?: boolean;
  isTop?: boolean;
  tagIds?: number[];
}

interface ArticlesTableProps {
  page: number;
  limit: number;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
  filters: Filters;
}

type ResourceType = "article";

interface MetaData {
  id: number;
  name: string;
  content: string;
  isDefault: boolean;
  resourceType: string;
  resourceId: number;
}

const MetadataModal = React.memo(
  ({
    visible,
    currentArticleId,
    onCancel,
    metadata,
    setMetadata,
  }: {
    visible: boolean;
    currentArticleId: number;
    onCancel: () => void;
    metadata: MetaData[];
    setMetadata: (metadata: MetaData[]) => void;
  }) => {
    const [loading, setLoading] = useState(false);

    const defaultMetaData: MetaData = {
      id: 0,
      name: "",
      content: "",
      isDefault: false,
      resourceType: "article",
      resourceId: currentArticleId,
    };

    const handleAddMetadata = () => {
      setMetadata([...metadata, JSON.parse(JSON.stringify(defaultMetaData))]);
    };

    const handleDeleteMetadata = async (index: number) => {
      const { id } = metadata[index];
      setLoading(true);
      try {
        await deleteMeta(id);
        const newMetadata = [...metadata];
        newMetadata.splice(index, 1);
        setMetadata(newMetadata);
        message.success("删除成功");
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    const handleSaveMetaData = async (index: number) => {
      const { id, ...others } = metadata[index];
      if (!others.name) {
        return message.error("请输入name")
      }
      if (!others.content) {
        return message.error("请输入content")
      }
      setLoading(true);
      try {
        if (id) {
          await updateMeta(id, metadata[index]);
        } else {
          await createMeta(others);
        }
        message.success("保存成功");
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    const handleChangeMetadata = (
      index: number,
      field: "name" | "content",
      newValue: string
    ) => {
      const newMetadata = [...metadata];
      newMetadata[index][field] = newValue;
      setMetadata(newMetadata);
    };

    return (
      <Modal
        title="元数据管理"
        open={visible}
        width={600}
        onCancel={onCancel}
        cancelText="取消"
        loading={loading}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            取消
          </Button>,
        ]}
      >
        {metadata.length === 0 ? (
          <Empty description="暂无元数据" />
        ) : (
          <div style={{ marginTop: "40px" }}>
            {metadata.map((item, index) => (
              <div key={index} style={{ display: "flex", marginBottom: 8 }}>
                <Input
                  placeholder="name"
                  value={item.name}
                  onChange={(e) =>
                    handleChangeMetadata(index, "name", e.target.value)
                  }
                  style={{ marginRight: 8 }}
                />
                <Input
                  placeholder="content"
                  value={item.content}
                  onChange={(e) =>
                    handleChangeMetadata(index, "content", e.target.value)
                  }
                  style={{ marginRight: 8 }}
                />
                <Popconfirm
                  title="确定删除该元数据吗？"
                  onConfirm={() => handleDeleteMetadata(index)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button type="link" danger>
                    删除
                  </Button>
                </Popconfirm>
                <Button type="link" onClick={() => handleSaveMetaData(index)}>
                  保存
                </Button>
              </div>
            ))}
          </div>
        )}
        <Button
          type="dashed"
          onClick={handleAddMetadata}
          style={{ width: "100%", marginTop: "20px" }}
        >
          添加元数据
        </Button>
      </Modal>
    );
  }
);

const ArticlesTable = withFallback(
  ({ page, limit, setPage, setLimit, filters }: ArticlesTableProps) => {
    const [metadataModalVisible, setMetadataModalVisible] = useState(false);
    const [currentArticleId, setCurrentArticleId] = useState<number>(0);
    const [metadata, setMetadata] = useState<MetaData[]>([]);

    const queryClient = useQueryClient();

    const { mutate: togglePulish } = useUpdatePublishStatus();
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
              togglePulish({ id: record.id, value: !record.isPublished })
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

interface SearchFormProps {
  onSearch: (values: Filters) => void;
}

const SearchForm = React.memo(
  withFallback(({ onSearch }: SearchFormProps) => {
    const { data: tags = [] } = useSuspenseQuery({
      queryKey: ["admin-tags"],
      queryFn: () => fetchTags(),
    });

    const { data: categories = [] } = useSuspenseQuery({
      queryKey: ["admin-categories"],
      queryFn: () => fetchCategories(),
    });

    const [form] = Form.useForm();

    const handleSearch = () => {
      startTransition(() => {
        const values = form.getFieldsValue();
        onSearch(values);
      });
    };

    const handleAdd = () => {
      navigate("/admin/article/upsert"); // 跳转到添加文章的页面
    };

    const _s = useMountedStyles();

    return (
      <Form
        style={{
          margin: "20px 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          ..._s,
        }}
        form={form}
        layout="inline"
      >
        <Form.Item name="title">
          <Input placeholder="请输入标题" allowClear />
        </Form.Item>
        <Form.Item name="tagIds">
          <Select
            style={{ width: "220px" }}
            placeholder="请选择标签"
            maxTagCount={"responsive"}
            mode="multiple"
            allowClear
          >
            {tags.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="categoryIds">
          <Select
            style={{ width: "220px" }}
            placeholder="请选择分类"
            maxTagCount={"responsive"}
            mode="multiple"
            allowClear
          >
            {categories.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="isPublished">
          <Select
            placeholder="是否已发布"
            style={{ width: "120px" }}
            allowClear
          >
            <Select.Option value={true}>是</Select.Option>
            <Select.Option value={false}>否</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="isTop">
          <Select placeholder="是否置顶" style={{ width: "120px" }} allowClear>
            <Select.Option value={true}>是</Select.Option>
            <Select.Option value={false}>否</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAdd}>
            添加
          </Button>
        </Form.Item>
      </Form>
    );
  })
);

function Page() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [filters, setFilters] = useState<Filters>({});

  const handleSearch = (values: Filters) => {
    setFilters(values);
    setPage(1); // 重置页码为第一页
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <ArticlesTable
        page={page}
        limit={limit}
        filters={filters}
        setPage={setPage}
        setLimit={setLimit}
      />
    </>
  );
}

export { Page };
