import { Button, Form, Input } from "antd";
import React, { startTransition } from "react"
import { withFallback } from "vike-react-query";

export interface Filters {
  name?: string
}

interface TagFilterProps {
  onSearch: (values: Filters) => void;
  onAdd: () => void
}

const TagsFilter = React.memo(
  withFallback(({ onSearch, onAdd }: TagFilterProps) => {

    const [form] = Form.useForm();

    const handleSearch = () => {
      startTransition(() => {
        const values = form.getFieldsValue();
        onSearch(values);
      });
    };
    return (
      <Form
        style={{
          margin: "20px 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
        form={form}
        layout="inline"
      >
        <Form.Item name="name">
          <Input placeholder="请输入名称" allowClear />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onAdd}>
            添加
          </Button>
        </Form.Item>
      </Form>
    );
  })
)

export { TagsFilter };