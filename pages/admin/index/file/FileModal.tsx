import React, { useState } from "react";
import { Modal, Upload, message, Select, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { uploadFile } from "#root/api/file";
import { fileFilters } from "#root/api/file/type";
import { DeleteOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Option } = Select;

interface FileModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  filters: fileFilters;
}

const FileModal = React.memo(({ visible, onCancel, onSuccess, filters }: FileModalProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(filters.type || "");
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // 添加重置状态
  const resetState = () => {
    setSelectedType(filters.type || "");
    setFileToUpload(null);
  };

  const handleUpload = async () => {
    if (!selectedType || !fileToUpload) {
      message.error("请先选择文件类型并选择文件");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("type", selectedType);

    try {
      setLoading(true);
      await uploadFile(formData);
      message.success("文件上传成功");
      onSuccess();
      resetState(); // 上传成功后重置状态
    } catch (error) {
      message.error("文件上传失败");
    } finally {
      setLoading(false);
    }
  };

  // 添加文件预览
  const renderPreview = () => {
    if (!fileToUpload) return null;

    const fileType = fileToUpload.type.split('/')[0];
    const fileUrl = URL.createObjectURL(fileToUpload);

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {fileType === 'image' && <img src={fileUrl} alt="预览" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
        {fileType === 'video' && <video controls src={fileUrl} style={{ maxWidth: '100%', maxHeight: '100%' }} />}
        {fileType === 'audio' && <audio controls src={fileUrl} style={{ width: '100%' }} />}
        {!['image', 'video', 'audio'].includes(fileType) && <p>{fileToUpload.name}</p>}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
          onClick={(e) => {
            e.stopPropagation(); // 阻止事件冒泡
          }}
        >
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: '#fff', fontSize: 24 }} />}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none'
            }}
            onClick={(e) => {
              e.stopPropagation();
              setFileToUpload(null);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <Modal
      title="上传文件"
      open={visible}
      onCancel={() => {
        resetState();
        onCancel();
      }}
      footer={[
        <Button key="cancel" onClick={() => {
          resetState();
          onCancel();
        }}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleUpload}
        >
          确定
        </Button>,
      ]}
      confirmLoading={loading}
    >
      <div style={{ marginBottom: 16 }}>
        <Select
          placeholder="选择文件类型"
          value={selectedType}
          onChange={setSelectedType}
          style={{ width: '100%' }}
        >
          <Option value="article">文章图片</Option>
          <Option value="image">图片</Option>
          <Option value="document">文档</Option>
          <Option value="video">视频</Option>
          <Option value="audio">音频</Option>
        </Select>
      </div>
      <Dragger
        name="file"
        multiple={false}
        beforeUpload={(file) => {
          setFileToUpload(file);
          return false;
        }}
        showUploadList={false}
      >
        {fileToUpload ? (
          renderPreview()
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
          </>
        )}
      </Dragger>
    </Modal>
  );
});

export { FileModal };
