import React, { useState } from "react";
import { createMeta, deleteMeta, updateMeta } from "#root/api/meta";
import { MetaData } from "#root/api/meta/type";
import { Button, Empty, Input, message, Modal, Popconfirm } from "antd";

const MetadataModal = React.memo(
  ({
    visible,
    currentArticleId,
    onCancel,
    metadata,
    setMetadata,
  }: {
    visible: boolean;
    currentArticleId: number;
    onCancel: () => void;
    metadata: MetaData[];
    setMetadata: (metadata: MetaData[]) => void;
  }) => {
    const [loading, setLoading] = useState(false);

    const defaultMetaData: MetaData = {
      id: 0,
      name: "",
      content: "",
      isDefault: false,
      resourceType: "article",
      resourceId: currentArticleId,
    };

    const handleAddMetadata = () => {
      setMetadata([...metadata, JSON.parse(JSON.stringify(defaultMetaData))]);
    };

    const handleDeleteMetadata = async (index: number) => {
      const { id } = metadata[index];
      setLoading(true);
      try {
        await deleteMeta(id);
        const newMetadata = [...metadata];
        newMetadata.splice(index, 1);
        setMetadata(newMetadata);
        message.success("删除成功");
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    const handleSaveMetaData = async (index: number) => {
      const { id, ...others } = metadata[index];
      if (!others.name) {
        return message.error("请输入name");
      }
      if (!others.content) {
        return message.error("请输入content");
      }
      setLoading(true);
      try {
        if (id) {
          await updateMeta(id, metadata[index]);
        } else {
          await createMeta(others);
        }
        message.success("保存成功");
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    const handleChangeMetadata = (
      index: number,
      field: "name" | "content",
      newValue: string
    ) => {
      const newMetadata = [...metadata];
      newMetadata[index][field] = newValue;
      setMetadata(newMetadata);
    };

    return (
      <Modal
        title="元数据管理"
        open={visible}
        width={600}
        onCancel={onCancel}
        cancelText="取消"
        loading={loading}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            取消
          </Button>,
        ]}
      >
        {metadata.length === 0 ? (
          <Empty description="暂无元数据" />
        ) : (
          <div style={{ marginTop: "40px" }}>
            {metadata.map((item, index) => (
              <div key={index} style={{ display: "flex", marginBottom: 8 }}>
                <Input
                  placeholder="name"
                  value={item.name}
                  onChange={(e) =>
                    handleChangeMetadata(index, "name", e.target.value)
                  }
                  style={{ marginRight: 8 }}
                />
                <Input
                  placeholder="content"
                  value={item.content}
                  onChange={(e) =>
                    handleChangeMetadata(index, "content", e.target.value)
                  }
                  style={{ marginRight: 8 }}
                />
                <Popconfirm
                  title="确定删除该元数据吗？"
                  onConfirm={() => handleDeleteMetadata(index)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button type="link" danger>
                    删除
                  </Button>
                </Popconfirm>
                <Button type="link" onClick={() => handleSaveMetaData(index)}>
                  保存
                </Button>
              </div>
            ))}
          </div>
        )}
        <Button
          type="dashed"
          onClick={handleAddMetadata}
          style={{ width: "100%", marginTop: "20px" }}
        >
          添加元数据
        </Button>
      </Modal>
    );
  }
);

export { MetadataModal };
