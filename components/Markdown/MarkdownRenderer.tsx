import React, {
  useEffect,
  useRef,
  useState,
  Suspense,
  memo,
  useCallback,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CopyToClipboard from "react-copy-to-clipboard";
import styles from "./MarkdownRenderer.module.scss";
import CodeHighlight from "./CodeHighlight";

// 定义 code 组件的属性类型
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeBlockWrapper = memo(
  ({ code, language }: { code: string; language: string }) => {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();

    const handleCopy = useCallback(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setCopied(true);
      timerRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }, []);

    useEffect(() => {
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, []);

    return (
      <div className={styles["code-block"]}>
        <div className={styles["code-header"]}>
          <span className={styles["code-lang"]}>{language}</span>
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <button>{copied ? "复制成功" : "复制"}</button>
          </CopyToClipboard>
        </div>
        <CodeHighlight code={code} language={language} />
      </div>
    );
  }
);

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <div className={styles["markdown"]}>
      <Suspense fallback={<div>加载中...</div>}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || "");
              const codeKey = String(children); // 使用代码内容作为唯一 key
              return !inline && match ? (
                <CodeBlockWrapper
                  code={String(children).replace(/\n$/, "")}
                  language={match[1]}
                />
              ) : (
                <code className={styles["alone-code"]} {...props}>
                  {children}
                </code>
              );
            },
            table: ({ node, ...props }) => (
              <div className={styles["table-container"]}>
                <table {...props} />
              </div>
            ),
            th: ({ node, ...props }) => <th style={{ textAlign: 'left' }} {...props} />,
            tr: ({ node, ...props }) => <tr {...props} />,
            td: ({ node, ...props }) => <td {...props} />,

            blockquote: ({ node, children, ...props }) => (
              <blockquote className={styles.blockquote} {...props}>
                {children}
              </blockquote>
            ),
            li: ({ node, className, ...props }) => {
              if (className === 'task-list-item') {
                return <li className={styles[className]} {...props} />;
              }
              return <li className={className} {...props} />;
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
