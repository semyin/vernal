import React, { useEffect, useState } from "react"
import { Input, Modal } from "antd";
import { useCreateCategory, useUpdateCategory } from "#root/api/category/hooks";

interface Props {
  visible: boolean;
  currentId?: number;
  currentName?: string;
  currentDescription?: string;
  onCancel: () => void;
}

const CategoryModal = React.memo(
  ({
    visible,
    onCancel,
    currentId,
    currentName,
    currentDescription
  }: Props) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const { mutate: createCategory } = useCreateCategory()
    const { mutate: updateCategory } = useUpdateCategory()

    useEffect(() => {
      if (visible && currentName !== undefined && currentDescription !== undefined) {
        setName(currentName);
        setDescription(currentDescription);
      }
    }, [visible, currentName, currentDescription]);

    const handleOk = async () => {
      setLoading(true);
      try {
        if (currentId) {
          await updateCategory({ id: currentId, data: { name, description } });
        } else {
          await createCategory({ name, description });
        }
      } finally {
        setLoading(false);
        onCancel();
      }
    };


    return <>

      <Modal
        title="分类管理"
        open={visible}
        onCancel={onCancel}
        onOk={handleOk}
        cancelText="取消"
        okText="保存"
        confirmLoading={loading}
      >
        <div>
          <Input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginRight: 8 }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Input
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginRight: 8 }}
          />
        </div>
      </Modal>
    </>
  })

export { CategoryModal };