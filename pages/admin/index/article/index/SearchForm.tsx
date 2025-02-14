import React, { startTransition } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import { withFallback } from "vike-react-query";
import { navigate } from "vike/client/router";
import { useMountedStyles } from "#root/hooks/useMountedStyles";
import { fetchCategories } from "#root/api/category";
import { fetchTags } from "#root/api/tag";

export interface Filters {
  title?: string;
  isPublished?: boolean;
  isTop?: boolean;
  tagIds?: number[];
  categoryIds?: number[]
}

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

export { SearchForm };
