import { fetchArticles } from "#root/api/article";
import { Link } from "#root/components/Link/Link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { withFallback } from "vike-react-query";
import { Error } from "#root/components/Query/Error";
import { Loading } from "#root/components/Query/Loading";
import { NoData } from "#root/components/Query/NoData";
import styles from "./Articles.module.scss";

const Articles = withFallback(
  () => {
    const result = useSuspenseQuery({
      queryKey: ["articles"],
      queryFn: () => fetchArticles({ title: "fdjshfk" }),
    });
    const articles = result.data || [];

    return articles.length ? (
      <ul className={styles["article-list"]}>
        {articles.map((item) => {
          return (
            <li key={item.id}>
              <span>
                <i>
                  <time dateTime={item.updatedAt}>
                    {format(item.createdAt, "yyyy-MM-dd")}
                  </time>
                </i>
              </span>
              <Link href={`/post/${item.id}`}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    ) : (
      <NoData text="No Article" />
    );
  },
  () => <Loading loadingText="Loading Articles..." />,
  // The props `retry` and `error` are provided by vike-react-query
  // Other props, such as `code`, are provied by the parent component
  ({ ...props }) => (
    <Error errorText="Failed To Load Articles with" {...props} />
  )
);

export default Articles;
