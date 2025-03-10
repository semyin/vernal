import { fetchUserDetail } from "#root/api/user";
import { useCreateUser, useUpdateUser } from "#root/api/user/hooks";
import { User } from "#root/api/user/type";
import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";


interface Props {
  visible: boolean;
  currentId?: number;
  onCancel: () => void;
}

const UserModal = React.memo(
  ({ visible, currentId, onCancel }: Props) => {
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const { mutate: createUser } = useCreateUser()
    const { mutate: updateUser } = useUpdateUser()

    const [form] = Form.useForm();

    useEffect(() => {
      if (visible && currentId) {
        fetchDetail(currentId)
      }
    }, [visible, currentId])

    const handleOk = async (values: Partial<User>) => {
      setButtonLoading(true);
      try {
        if (currentId) {
          await updateUser({ id: currentId, data: values });
        } else {
          await createUser(values);
        }
      } finally {
        setButtonLoading(false);
        handleCancel();
      }
    };

    const fetchDetail = async (id: number) => {
      setLoading(true)
      try {
        const result = await fetchUserDetail(id)
        form.setFieldsValue(result)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    const handleCancel = () => {
      form.resetFields();
      onCancel();
    };

    const getRules = (label: string) => {
      return [{ required: true, message: label + "不能为空" }]
    }

    return <Modal
      title="用户管理"
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
      >
        <Form.Item name="username" label="用户名" rules={getRules("用户名")}>
          <Input id="user.username" placeholder="请输入用户名" allowClear />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={getRules("邮箱")}>
          <Input id="user.email" placeholder="请输入邮箱" allowClear />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={getRules("密码")}>
          <Input.Password id="user.password" placeholder="请输入密码" allowClear />
        </Form.Item>
        <Form.Item name="avatarUrl" label="头像链接">
          <Input placeholder="请输入头像链接" allowClear />
        </Form.Item>
        <Form.Item name="pushType" label="消息推送类型">
          <Input placeholder="请输入消息推送类型" allowClear />
        </Form.Item>
        <Form.Item name="pushUrl" label="消息推送链接">
          <Input placeholder="消息推送链接" allowClear />
        </Form.Item>
        <Form.Item name="phone" label="手机号">
          <Input id="user.phone" placeholder="请输入" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  }
)

export { UserModal };