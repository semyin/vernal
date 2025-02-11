import { withFallback } from "vike-react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Loading } from "#root/components/Query/Loading";
import { Error } from "#root/components/Query/Error";
import { ArticleList } from "#root/components/ArticleList/ArticleList";
import { fetchTagDetail } from "#root/api/tag";
import styles from "./Tag.module.scss";

const Tag = withFallback(
  ({ id }) => {
    const result = useSuspenseQuery({
      queryKey: ["tag", id],
      queryFn: () => fetchTagDetail(id),
    });

    const tag = result.data;

    const articles = tag.articles

    return (
      <div className={styles.tag}>
        <h1>
          标签：<span>{tag.name}</span>
        </h1>
        <p className={styles["article-count"]}>
          共有<span> {tag.articleCount} </span>篇文章
        </p>
        <ArticleList articles={articles} />
      </div>
    );
  },
  () => <Loading loadingText="Loading Tag Detail Page..." />,
  ({ ...props }) => (
    <Error errorText="Failed To Load Tag Detail Page with" {...props} />
  )
);

export default Tag;
