import { memo, useCallback, useEffect, useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import CodeHighlight from "./CodeHighlight";
import styles from "./MarkdownRenderer.module.scss";


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

export { CodeBlockWrapper };