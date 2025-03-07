import { useState, forwardRef, useEffect } from "react";
import "./MarkdownEditor.scss";
import { message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { uploadFile } from "#root/api/file";

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const MarkdownEditor = forwardRef<HTMLDivElement, MarkdownEditorProps>(
  ({ value, onChange }, ref) => {
    const [editorValue, setEditorValue] = useState(value || "");
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true); // 标记组件已加载完成
    }, []);

    useEffect(() => {
      setEditorValue(value || "");
    }, [value]);


    const handleChange = (newValue: string | undefined) => {
      if (!isMounted) return; // 如果组件未加载完成，不触发更新
      const updatedValue = newValue || "";
      setEditorValue(updatedValue);
      if (onChange) {
        onChange(updatedValue);
      }
    };

    // 图片上传处理
    const handleUpload = async (file: File) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "article"); // 上传类型

      try {
        const data = await uploadFile(formData);
        if (data.url) {
          // 将图片 URL 插入到编辑器中
          const markdownImage = `![${file.name}](${data.url})`;
          const newValue = editorValue ? `${editorValue}\n${markdownImage}` : markdownImage;
          onChange?.(newValue);
          message.success("图片上传成功!");
        } else {
          throw new Error("上传失败");
        }
      } catch (error) {
        message.error("图片上传失败,请重试");
      } finally {
        setLoading(false);
      }
    };

    // 自定义图片上传按钮
    const uploadImageButton = {
      name: "uploadImage",
      keyCommand: "uploadImage",
      buttonProps: { "aria-label": "上传图片" },
      icon: <UploadOutlined />,
      execute: () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            handleUpload(file);
          }
        };
        input.click();
      },
    };

    // 将自定义按钮添加到工具栏
    const customCommands = [
      commands.bold,
      commands.italic,
      commands.strikethrough,
      commands.hr,
      commands.title,
      commands.divider,
      commands.link,
      commands.quote,
      commands.code,
      commands.codeBlock,
      commands.comment,
      commands.image,
      commands.table,
      commands.divider,
      commands.unorderedListCommand,
      commands.orderedListCommand,
      commands.checkedListCommand,
      commands.help,
      uploadImageButton, // 添加自定义按钮
    ];

    return (
      <div ref={ref}>
        <MDEditor
          value={editorValue}
          onChange={handleChange}
          commands={customCommands}
          height={500}
          className="custom-md-editor"
        />
      </div>
    );
  }
);

export default MarkdownEditor;
