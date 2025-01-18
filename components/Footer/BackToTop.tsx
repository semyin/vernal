import React, { useState, useEffect } from "react";
import styles from './BackToTop.module.scss'

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 监听页面滚动事件
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // 清除事件监听
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 平滑滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滚动
    });
  };

  // 如果不显示，返回 null
  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles['back-to-top']}>
      <a onClick={scrollToTop}>返回顶部 ↑</a>
    </div>
  );
};

export default BackToTop;
