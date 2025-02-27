import { memo, useCallback, useEffect } from "react";
import styles from "./MarkdownRenderer.module.scss";

interface ImagePreviewProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ImagePreview = memo(({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImagePreviewProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
    if (e.key === 'Escape') onClose()
  }, [onPrev, onNext, onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className={styles["image-preview"]} onClick={onClose}>
      <button
        className={styles["nav-button"]}
        style={{ left: 20 }}
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        disabled={currentIndex === 0}
      >
        ←
      </button>

      <div className={styles["preview-content"]}>
        <img
          src={images[currentIndex]}
          alt="全屏预览"
          onClick={(e) => e.stopPropagation()}
        />
        <div className={styles["preview-index"]}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <button
        className={styles["nav-button"]}
        style={{ right: 20 }}
        onClick={(e) => { e.stopPropagation(); onNext() }}
        disabled={currentIndex === images.length - 1}
      >
        →
      </button>
    </div>
  )
})

export { ImagePreview };