import React, { useEffect, useRef, useState, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
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
  // 使用对象存储每个代码块的复制状态;
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  // 用于存储 setTimeout 的计时器 ID
  const timerRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    // 组件卸载时清除所有计时器
    return () => {
      Object.values(timerRef.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handleCopy = (key: string) => {
    if (typeof window === "undefined") return; // 确保只在客户端执行
    // 清除之前的计时器（如果有）
    if (timerRef.current[key]) {
      clearTimeout(timerRef.current[key]);
    }

    // 更新复制状态
    setCopiedStates((prev) => ({ ...prev, [key]: true }));

    // 设置新的计时器
    timerRef.current[key] = setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000); // 2 秒后重置复制状态
  };

  return (
    <div className={styles["markdown"]}>
      <Suspense fallback={<div>加载中...</div>}>
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
                        {copiedStates[codeKey] ? "复制成功" : "复制"}
                      </button>
                    </CopyToClipboard>
                  </div>
                  <SyntaxHighlighter
                    style={theme}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ margin: 0, padding: "12px" }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={styles["alone-code"]} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </Suspense>
    </div>
  );
};

export default MarkdownRenderer;
