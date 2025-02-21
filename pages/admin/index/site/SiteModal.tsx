
import React, { useEffect, useState } from "react"
import { Button, DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import { useUpdateSite } from "#root/api/site-config/hooks";
import { Site } from "#root/api/site-config/type";

interface Props {
  visible: boolean;
  site: Site,
  onCancel: () => void;
}

const SiteModal = React.memo(
  ({ visible, site, onCancel }: Props) => {

    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [form] = Form.useForm();

    const { mutate: updateSite } = useUpdateSite()

    useEffect(() => {
      if (visible) {
        const { runTime, ...others } = site;
        const _runTime = dayjs(runTime)
        form.setFieldsValue({
          ...others,
          runTime: _runTime
        })
      }
    }, [visible])

    const handleCancel = () => {
      form.resetFields();
      onCancel();
    };

    const handleOk = async (values: Site) => {
      setButtonLoading(true);
      try {
        const { runTime, ...others } = values
        const _runTime = dayjs(runTime).format("YYYY-MM-DD HH:mm:ss")
        await updateSite({ ...others, runTime: _runTime });
      } finally {
        setButtonLoading(false);
        handleCancel();
      }
    };

    const getRules = (label: string) => {
      return [{ required: true, message: label + "不能为空" }]
    }

    return <Modal
      title="站点信息"
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
        <Form.Item name="name" label="站点名称" rules={getRules("站点名称")}>
          <Input placeholder="name" allowClear />
        </Form.Item>
        <Form.Item name="url" label="站点链接" rules={getRules("站点链接")}>
          <Input placeholder="url" allowClear />
        </Form.Item>
        <Form.Item name="description" label="站点描述">
          <Input placeholder="description" allowClear />
        </Form.Item>
        <Form.Item name="copyright" label="版权信息" rules={getRules("版权信息")}>
          <Input placeholder="copyright" allowClear />
        </Form.Item>
        <Form.Item name="icp" label="ICP备案号" rules={getRules("ICP备案号")}>
          <Input placeholder="icp" allowClear />
        </Form.Item>
        <Form.Item name="runTime" label="运行时间" rules={getRules("运行时间")}>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择运行时间"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  }
)

export { SiteModal };