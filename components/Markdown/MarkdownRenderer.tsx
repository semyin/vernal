import React, {
  useEffect,
  useRef,
  useState,
  Suspense,
  memo,
  useCallback,
  useMemo,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlockWrapper } from "./CodeBlockWrapper";
import { ImagePreview } from "./ImagePreview";
import styles from "./MarkdownRenderer.module.scss";
import { CodeProps } from "./types";

const MarkdownRenderer = ({ content }: { content: string }) => {

  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const imagesRef = useRef<string[]>([])

  useEffect(() => {
    imagesRef.current = []
  }, [content])

  useEffect(() => {
    if (previewIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [previewIndex]);

  const handlePrev = useCallback(() => {
    setPreviewIndex(prev => Math.max(0, (prev || 0) - 1));
  }, [])

  const handleNext = useCallback(() => {
    setPreviewIndex(prev => Math.min(imagesRef.current.length - 1, (prev || 0) + 1));
  }, [])

  const ImageComponent = useMemo(() => memo(({ src, alt }: { src?: string; alt?: string }) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
      if (src && !imagesRef.current.includes(src)) {
        imagesRef.current = [...imagesRef.current, src];
      }
    }, [src]);

    useEffect(() => {
      const img = imgRef.current;
      if (img) {
        const handleLoad = () => img.classList.add(styles.loaded);
        if (img.complete) handleLoad();
        img.addEventListener("load", handleLoad);
        return () => img.removeEventListener("load", handleLoad);
      }
    }, []);

    const handleClick = () => {
      const currentIndex = imagesRef.current.indexOf(src!);
      if (currentIndex !== -1) setPreviewIndex(currentIndex);
    };

    return (
      <img
        ref={imgRef}
        src={src}
        alt={alt || ""}
        className={styles["markdown-image"]}
        loading="lazy"
        onClick={handleClick}
      />
    );
  }), []);

  return (
    <div className={styles["markdown"]}>
      {previewIndex !== null && (
        <ImagePreview
          images={imagesRef.current}
          currentIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
      <Suspense fallback={<div>加载中...</div>}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ node, ...props }) => (
              <ImageComponent key={props.src} src={props.src} alt={props.alt} />
            ),
            code({ node, inline, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || "");
              const codeKey = String(children);
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
