import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { fetchMetaDetail } from "#root/api/meta";
import { useCreateMeta, useUpdateMeta } from "#root/api/meta/hooks";
import { Meta } from "#root/api/meta/type";
import { Article } from "#root/api/tag/type";
import { fetchManageArticles } from "#root/api/article";

interface Props {
  visible: boolean;
  currentId?: number,
  onCancel: () => void;
}

const MetaModal = React.memo(
  ({
    visible,
    currentId,
    onCancel
  }: Props) => {
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isDefault, setIsDefault] = useState(true);
    const [resourceType, setResourceType] = useState("");
    const [articles, setArticles] = useState<Article[]>([])

    const { mutate: createMeta } = useCreateMeta()
    const { mutate: updateMeta } = useUpdateMeta()
    const [form] = Form.useForm();

    useEffect(() => {
      if (visible && currentId) {
        fetchDetail(currentId)
      }
    }, [visible, currentId])

    const fetchDetail = async (id: number) => {
      setLoading(true)
      try {
        const result = await fetchMetaDetail(id)
        form.setFieldsValue(result)
        setIsDefault(result.isDefault);
        setResourceType(result.resourceType);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      if (resourceType === "article") {
        doFetchArticles();
      }
    }, [resourceType]);

    const doFetchArticles = async () => {
      try {
        const result = await fetchManageArticles({ limit: 1000, page: 1 });
        setArticles(result.items);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    const handleOk = async (values: Partial<Meta>) => {
      setButtonLoading(true);
      try {
        if (currentId) {
          await updateMeta({ id: currentId, data: values });
        } else {
          await createMeta(values);
        }
      } finally {
        setButtonLoading(false);
        handleCancel();
      }
    };

    const handleCancel = () => {
      form.resetFields();
      setIsDefault(false);
      setResourceType("");
      onCancel();
    };

    const handleIsDefaultChange = (value: boolean) => {
      setIsDefault(value);
      setResourceType("");
      form.setFieldsValue({ resourceType: null, resourceId: null });
    };

    const handleResourceTypeChange = (value: string) => {
      setResourceType(value);
      form.setFieldsValue({ resourceId: null });
    }

    const getRules = (label: string) => {
      return [{ required: true, message: label + "不能为空" }]
    }


    return <Modal
      title="元素据管理"
      open={visible}
      onCancel={handleCancel}
      loading={loading}
      footer={
        <>
          <Button onClick={handleCancel}>取消</Button>
          <Button loading={buttonLoading} onClick={() => form.submit()} type="primary">保存</Button>
        </>
      }
    >
      <Form
        onFinish={handleOk}
        style={{ marginTop: "20px" }}
        form={form}
        labelCol={{ span: 5 }}
      >
        <Form.Item name="name" label="name" rules={getRules("name")}>
          <Input placeholder="name" allowClear />
        </Form.Item>
        <Form.Item name="property" label="property" rules={getRules("property")}>
          <Input placeholder="property" allowClear />
        </Form.Item>
        <Form.Item name="content" label="content" rules={getRules("content")}>
          <Input.TextArea rows={4} placeholder="content" allowClear />
        </Form.Item>
        <Form.Item name="isDefault" label="是否站点值" rules={getRules("是否站点值")}>
          <Select
            style={{ width: "220px" }}
            placeholder="isDefault"
            allowClear
            onChange={handleIsDefaultChange}
          >
            <Select.Option value={true}>
              默认
            </Select.Option>
            <Select.Option value={false}>
              否
            </Select.Option>
          </Select>
        </Form.Item>
        {!isDefault && <Form.Item name="resourceType" label="资源类型" rules={getRules("资源类型")}>
          <Select
            style={{ width: "220px" }}
            placeholder="resourceType"
            allowClear
            onChange={handleResourceTypeChange}
          >
            <Select.Option value="article">
              文章
            </Select.Option>
          </Select>
        </Form.Item>}
        {
          !isDefault && resourceType === "article" &&
          <Form.Item name="resourceId" label="选择文章" rules={getRules("文章")}>
            <Select
              style={{ width: "220px" }}
              placeholder="resourceId"
              allowClear
            >
              {articles.map((article) => (
                <Select.Option key={article.id} value={article.id}>
                  {article.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        }
      </Form>
    </Modal>
  }
)

export { MetaModal };