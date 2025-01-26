import { withFallback } from "vike-react-query";
import MarkdownRenderer from "#root/components/Markdown/MarkdownRenderer";
import { Loading } from "#root/components/Query/Loading";
import { Error } from "#root/components/Query/Error";
import { Link } from "#root/components/Link/Link";
import styles from "./Content.module.scss";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchArticleDetail } from "#root/api/article";
import useDateFormat from "#root/hooks/useDateFormat";

const Content = withFallback(
  ({ id }) => {
    const result = useSuspenseQuery({
      queryKey: ["article", "id"],
      queryFn: () => fetchArticleDetail(id),
    });
    const detail = result.data;
    const tags = detail.tags;
    const time = useDateFormat(detail.createdAt);

    return (
      <div className={styles["article-content"]}>
        <h1>{detail.title}</h1>
        <div className={styles["article-info"]}>
          <div className={styles["article-tags"]}>
            {tags?.map((item, index) => {
              return (
                <span key={item.id}>
                  <Link href={`/tags/${item.id}`}>{item.name}</Link>
                  <span> </span>
                  <span>·</span>
                </span>
              );
            })}
          </div>
          <span className={styles["article-time"]}>{time}</span>
        </div>
        <MarkdownRenderer content={detail.content} />
      </div>
    );
  },
  () => <Loading loadingText="Loading Article Detail Page..." />,
  ({ ...props }) => (
    <Error errorText="Failed To Load Article Detail Page with" {...props} />
  )
);

export default Content;
