import { withFallback } from "vike-react-query"
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { clientOnly } from "vike-react/clientOnly";
import { navigate } from "vike/client/router";
import { Form, Input, Button, Select, Upload, message, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createArticle, getArticleDetail, updateArticle } from "#root/api/article";
import { Article } from "#root/types/Article";
import { fetchTags } from "#root/api/tag";
import { fetchCategories } from "#root/api/category";
import { uploadFile } from "#root/api/files";
import { useMountedStyles } from "#root/hooks/useMountedStyles";

const MarkdownEditor = clientOnly(
  () => import("#root/components/Markdown/MarkdownEditor")
);

const { TextArea } = Input;
const { Option } = Select;


const UpsertArticle = withFallback(
  ({ id }) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const _s = useMountedStyles();

    const { data: detail } = id ? useSuspenseQuery({
      queryKey: ["admin-article-detail", id],
      queryFn: () => getArticleDetail(id),
    }) : { data: null };

    useEffect(() => {
      if (detail) {
        const { tags = [], ...others } = detail
        form.setFieldsValue({ ...others, tagIds: tags.map(item => item.id) });
      }
    }, [detail, form]);

    const { data: tags } = useSuspenseQuery({
      queryKey: ["admin-tags"],
      queryFn: () => fetchTags(),
    });

    const { data: categories } = useSuspenseQuery({
      queryKey: ["admin-categories"],
      queryFn: () => fetchCategories(),
    });

    const onFinish = async (values: Article) => {
      setLoading(true);
      try {
        if (id) {
          await updateArticle(id, values);
        } else {
          await createArticle(values);
        }
        message.success("保存成功").then(() => {
          navigate("/admin/article");
        })
      } catch (error) {
        message.error("保存失败");
      } finally {
        setLoading(false);
      }
    };

    const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
      setFileList(fileList);
    };

    const handleBeforeUpload = async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "article");

        // 调用上传接口
        const uploadResponse = await uploadFile(formData);

        // 更新 fileList
        setFileList([
          {
            uid: file.name,
            name: file.name,
            status: "done",
            url: uploadResponse.url,
          },
        ]);

        // 更新表单数据中的封面图片 URL
        form.setFieldsValue({ coverImage: uploadResponse.url });

        message.success("文件上传成功");
      } catch (error) {
        message.error("文件上传失败");
      }

      return false; // 阻止默认上传行为
    };

    return (
      <div style={{ ..._s }}>
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
            wrapperCol={{ span: 8 }}
            label="标签"
            name="tagIds"
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
              {categories.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
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

          <Form.Item label="封面图片" name="coverImage">
            <Upload
              listType="picture"
              fileList={fileList}
              maxCount={1}
              onChange={handleUploadChange}
              beforeUpload={handleBeforeUpload}
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
      </div>

    );
  },
  () => "loading...",
  ({ retry }) => <><span>Some errors occurred</span><a onClick={() => retry()}> click to retry</a></>
)

export { UpsertArticle };