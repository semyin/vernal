export { Avatar };

import { useState } from "react";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  avatarUrl: string;
  name: string;
  url: string;
}

function Avatar({ avatarUrl, name, url }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const onImgError = () => {
    console.log(1);
    setHasError(true);
  };

  return (
    <div className={styles["avatar"]}>
      {hasError ? (
        <div className={styles["default"]}>图片加载失败</div>
      ) : (
        <a href={url} target="_blank">
          <img
            src={avatarUrl}
            onError={() => onImgError}
            title={name}
            alt="图片加载失败..."
          />
        </a>
      )}
    </div>
  );
}
