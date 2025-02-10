import { withFallback } from "vike-react-query"
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { clientOnly } from "vike-react/clientOnly";
import { navigate } from "vike/client/router";
import { Form, Input, Button, Select, Upload, message, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createArticle } from "#root/api/article";
import { Article } from "#root/types/Tag";
import { fetchTags } from "#root/api/tag";

const MarkdownEditor = clientOnly(
  () => import("#root/components/Markdown/MarkdownEditor")
);

const { TextArea } = Input;
const { Option } = Select;


const UpsertArticle = withFallback(() => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { data: tags } = useSuspenseQuery({
    queryKey: ["admin-tags"],
    queryFn: () => fetchTags(),
  });

  const onFinish = async (values: Article) => {
    setLoading(true);
    try {
      await createArticle(values);
      message.success("文章创建成功").then(() => {
        navigate("/admin/article");
      })
    } catch (error) {
      message.error("文章创建失败");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 3 }}
      layout="horizontal"
      onFinish={onFinish}
      labelAlign="left"
      initialValues={{ type: "article", isPublished: false, isTop: false }}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input placeholder="请输入文章标题" />
      </Form.Item>

      <Form.Item label="摘要" name="summary">
        <TextArea rows={4} placeholder="请输入文章摘要" />
      </Form.Item>

      <Form.Item
        wrapperCol={{ span: 12 }}
        label="标签"
        name="tags"
        rules={[{ required: true, message: "请选择标签" }]}
      >
        <Select mode="multiple" maxTagCount={"responsive"} placeholder="请选择或输入标签" allowClear>
          {tags.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{ span: 4 }}
        label="分类"
        name="categoryId"
        rules={[{ required: true, message: "请选择分类" }]}
      >
        <Select allowClear placeholder="请选择分类">
          { }
        </Select>
      </Form.Item>

      <Form.Item
        label="是否发布"
        wrapperCol={{ span: 4 }}
        name="isPublished"
        rules={[{ required: true, message: "请选择是否发布" }]}
      >
        <Select>
          <Option value={true}>是</Option>
          <Option value={false}>否</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="是否置顶"
        wrapperCol={{ span: 4 }}
        name="isTop"
        rules={[{ required: true, message: "请选择是否置顶" }]}
      >
        <Select>
          <Option value={true}>是</Option>
          <Option value={false}>否</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="文章类型"
        wrapperCol={{ span: 4 }}
        name="type"
        rules={[{ required: true, message: "请选择文章类型" }]}
      >
        <Select disabled>
          <Option value="article">普通文章</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="作者ID"
        wrapperCol={{ span: 4 }}
        name="authorId"
        rules={[{ required: true, message: "请输入作者ID" }]}
      >
        <Input disabled type="number" placeholder="请输入作者ID" />
      </Form.Item>

      <Form.Item label="封面图片" name="coverImage">
        <Upload
          listType="picture"
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false} // 阻止自动上传
        >
          <Button icon={<UploadOutlined />}>上传封面图片</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="content"
        rules={[{ required: true, message: "请输入内容" }]}
      >
        <MarkdownEditor fallback={<div>loading...</div>} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
  return <></>
})

export { UpsertArticle };