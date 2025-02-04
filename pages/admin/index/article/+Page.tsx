import { fetchManageArticles } from "#root/api/article";
import { fetchTags } from "#root/api/tag";
import { Tag } from "#root/types/Tag";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Table, Tag as AntdTag, Form, Input, Select, Button } from "antd";
import { useState, startTransition, Suspense, useEffect } from "react";
import "antd/dist/reset.css";
import { withFallback } from "vike-react-query";
import { useMountedStyles } from "#root/hooks/useMountedStyles";

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

const ArticlesTable = withFallback(
  ({ page, limit, setPage, setLimit, filters }: ArticlesTableProps) => {
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
      </>
    );
  }
);

interface SearchFormProps {
  onSearch: (values: Filters) => void;
}

const SearchForm = withFallback(({ onSearch }: SearchFormProps) => {
  const result = useSuspenseQuery({
    queryKey: ["admin-tags"],
    queryFn: () => fetchTags(),
  });

  const [form] = Form.useForm();

  const handleSearch = () => {
    startTransition(() => {
      const values = form.getFieldsValue();
      onSearch(values);
    });
  };

  const _s = useMountedStyles();

  return (
    <Form style={{ margin: "20px 0", ..._s }} form={form} layout="inline">
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
          {result.data.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="isPublished">
        <Select placeholder="是否已发布" style={{ width: "120px" }} allowClear>
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
    </Form>
  );
});

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
