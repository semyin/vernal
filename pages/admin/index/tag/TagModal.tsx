import React, { useState, useEffect } from "react";
import { Input, Modal } from "antd";
import { useCreateTag, useUpdateTag } from "#root/api/tag/hooks";

interface Props {
  visible: boolean;
  currentTagId?: number;
  currentTagName?: string;
  onCancel: () => void;
}

const TagModal = React.memo(({ visible, onCancel, currentTagId, currentTagName }: Props) => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { mutate: createTag } = useCreateTag();
  const { mutate: updateTag } = useUpdateTag();

  useEffect(() => {
    if (visible && currentTagName !== undefined) {
      setName(currentTagName);
    }
  }, [visible, currentTagName]);

  const handleChange = (value: string) => {
    setName(value);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      if (currentTagId) {
        await updateTag({ id: currentTagId, name });
      } else {
        await createTag({ name });
      }
    } finally {
      setLoading(false);
      onCancel();
    }
  };

  return (
    <Modal
      title="元数据管理"
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      cancelText="取消"
      okText="保存"
      confirmLoading={loading}
    >
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => handleChange(e.target.value)}
        style={{ marginRight: 8 }}
      />
    </Modal>
  );
});

export { TagModal };
