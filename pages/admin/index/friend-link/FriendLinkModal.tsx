import React, { useEffect, useState } from "react"
import { Button, Form, Input, Modal, Select } from "antd";
import { useCreateFriendLink, useUpdateFriendLink } from "#root/api/friend-link/hooks";
import { FriendLink } from "#root/api/friend-link/type";
import { fetchFriendLinkDetail } from "#root/api/friend-link";

interface Props {
  visible: boolean;
  currentId?: number;
  onCancel: () => void;
}

const FriendLinkModal = React.memo(
  ({ visible, currentId, onCancel }: Props) => {
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const { mutate: createFriendLink } = useCreateFriendLink()
    const { mutate: updateFriendLink } = useUpdateFriendLink()

    const [form] = Form.useForm();

    useEffect(() => {
      if (visible && currentId) {
        fetchDetail(currentId)
      }
    }, [visible, currentId])

    const fetchDetail = async (id: number) => {
      setLoading(true)
      try {
        const result = await fetchFriendLinkDetail(id)
        form.setFieldsValue(result)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    const handleOk = async (values: Partial<FriendLink>) => {
      setButtonLoading(true);
      try {
        if (currentId) {
          await updateFriendLink({ id: currentId, data: values });
        } else {
          await createFriendLink(values);
        }
      } finally {
        setButtonLoading(false);
        handleCancel();
      }
    };

    const getRules = (label: string) => {
      return [{ required: true, message: label + "不能为空" }]
    }

    const handleCancel = () => {
      form.resetFields();
      onCancel();
    };

    return <Modal
      title="友链管理"
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
        initialValues={{
          type: "default",
          sortWeight: 1,
          isVisible: false
        }}
      >
        <Form.Item name="name" label="名称" rules={getRules("名称")}>
          <Input placeholder="请输入友链名称" allowClear />
        </Form.Item>
        <Form.Item name="url" label="链接" rules={getRules("链接")}>
          <Input placeholder="请输入友链链接" allowClear />
        </Form.Item>
        <Form.Item name="description" label="描述" rules={getRules("描述")}>
          <Input placeholder="请输入友链描述" allowClear />
        </Form.Item>
        <Form.Item name="avatarUrl" label="头像" rules={getRules("头像")}>
          <Input placeholder="请输入友链头像" allowClear />
        </Form.Item>
        <Form.Item name="type" label="类型" rules={getRules("类型")}>
          <Select
            disabled
            style={{ width: "220px" }}
            placeholder="请选择友链类型"
            allowClear
          >
            <Select.Option value="default">
              默认
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="sortWeight" label="权重" rules={getRules("权重")}>
          <Input type="number" placeholder="请输入友链权重" allowClear />
        </Form.Item>
        <Form.Item name="isVisible" label="展示" rules={getRules("展示")}>
          <Select
            placeholder="请选择是否展示"
            style={{ width: "120px" }}
            allowClear
          >
            <Select.Option value={true}>是</Select.Option>
            <Select.Option value={false}>否</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  }
)

export { FriendLinkModal };