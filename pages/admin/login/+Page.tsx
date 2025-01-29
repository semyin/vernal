export { Page };
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import styles from "./Login.module.scss";
import request from "#root/utils/request";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function Page() {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles["form-wrapper"]}>
        <h3>welcome vernal admin</h3>
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          style={{ minWidth: 360, maxWidth: 380 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="username" />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
