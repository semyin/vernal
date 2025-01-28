import { withFallback } from "vike-react-query";
import { Loading } from "#root/components/Query/Loading";
import { Error } from "#root/components/Query/Error";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchTagDetail } from "#root/api/tag";
import styles from "./Tag.module.scss";

const Tag = withFallback(
  ({ id }) => {

    const result = useSuspenseQuery({
      queryKey: ['tag', id],
      queryFn: () => fetchTagDetail(id)
    })

    const tag = result.data

    return (
      <div className={styles.tag}>
        <h1>
          标签：<span>{tag.name}</span>
        </h1>
        <p>共有 {tag.articleCount} 篇文章</p>
      </div>
    );
  },
  () => <Loading loadingText="Loading Article Detail Page..." />,
  ({ ...props }) => (
    <Error errorText="Failed To Load Article Detail Page with" {...props} />
  )
);

export default Tag;
