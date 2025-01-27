import { withFallback } from "vike-react-query";
import { Loading } from "#root/components/Query/Loading";
import { Error } from "#root/components/Query/Error";

import styles from "./Tag.module.scss";

const Tag = withFallback(
  ({ id }) => {
    return (
      <div className={styles.tag}>
        <h1>
          标签：<span></span>
        </h1>
        <p>共有 17 篇文章</p>
      </div>
    );
  },
  () => <Loading loadingText="Loading Article Detail Page..." />,
  ({ ...props }) => (
    <Error errorText="Failed To Load Article Detail Page with" {...props} />
  )
);

export default Tag;
