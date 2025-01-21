export { NoData };

import styles from "./Query.module.scss"

function NoData({ text }: { text: string }) {
    return <div className={styles["center-block"]}>
    <i>No data here</i>
  </div>
}
