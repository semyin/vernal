export { Loading };

import styles from "./Query.module.scss";

function Loading({ loadingText }: { loadingText: string }) {
  return <div className={styles["loading"]}>{ loadingText }</div>;
}
