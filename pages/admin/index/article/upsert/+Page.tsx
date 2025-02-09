import { useState } from "react";
import { clientOnly } from "vike-react/clientOnly";
import { navigate } from "vike/client/router";
import { Form, Input, Button, Select, Upload, message, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createArticle } from "#root/api/article";
import { Article } from "#root/types/Tag";

const MarkdownEditor = clientOnly(
  () => import("#root/components/Markdown/MarkdownEditor")
);

const { TextArea } = Input;
const { Option } = Select;

function Page() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = async (values: Article) => {
    console.log(values);
    return;
    setLoading(true);
    try {
      await createArticle(values);
      message.success("文章创建成功");
      navigate("/admin/article");
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
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ type: "article", isPublished: false, isTop: false }}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input placeholder="请输入文章标题" />
      </Form.Item>

      <Form.Item
        label="内容"
        name="content"
        rules={[{ required: true, message: "请输入内容" }]}
      >
        <MarkdownEditor fallback={<div>loading...</div>} />
        {/* <TextArea rows={10} placeholder="请输入文章内容" /> */}
      </Form.Item>

      <Form.Item label="摘要" name="summary">
        <TextArea rows={4} placeholder="请输入文章摘要" />
      </Form.Item>

      <Form.Item
        label="作者ID"
        name="authorId"
        rules={[{ required: true, message: "请输入作者ID" }]}
      >
        <Input type="number" placeholder="请输入作者ID" />
      </Form.Item>

      <Form.Item label="分类ID" name="categoryId">
        <Input type="number" placeholder="请输入分类ID" />
      </Form.Item>

      <Form.Item label="标签" name="tags">
        <Select mode="tags" placeholder="请选择或输入标签">
          {/* 这里可以动态加载标签 */}
        </Select>
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

      <Form.Item label="是否发布" name="isPublished">
        <Select>
          <Option value={true}>是</Option>
          <Option value={false}>否</Option>
        </Select>
      </Form.Item>

      <Form.Item label="是否置顶" name="isTop">
        <Select>
          <Option value={true}>是</Option>
          <Option value={false}>否</Option>
        </Select>
      </Form.Item>

      <Form.Item label="文章类型" name="type">
        <Select>
          <Option value="article">普通文章</Option>
          <Option value="about">关于页面</Option>
          <Option value="privacy">隐私政策</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}

export { Page };
