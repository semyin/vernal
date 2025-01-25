import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyToClipboard from "react-copy-to-clipboard";
import styles from "./MarkdownRenderer.module.scss";

// 定义 code 组件的属性类型
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const MarkdownRenderer = ({ content }: { content: string }) => {
  // 使用对象存储每个代码块的复制状态
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleCopy = (key: string) => {
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000); // 2 秒后重置复制状态
  };

  return (
    <div className={styles["markdown"]}>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || "");
            const codeKey = String(children); // 使用代码内容作为唯一 key
            return !inline && match ? (
              <div className={styles["code-block"]}>
                <div className={styles["code-header"]}>
                  <span className={styles["code-lang"]}>{match[1]}</span>
                  <CopyToClipboard
                    text={String(children).replace(/\n$/, "")}
                    onCopy={() => handleCopy(codeKey)}
                  >
                    <button>
                      {copiedStates[codeKey] ? "已复制!" : "复制代码"}
                    </button>
                  </CopyToClipboard>
                </div>
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0 }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
