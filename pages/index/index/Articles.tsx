import { fetchArticles } from "#root/api/article";
import { useSuspenseQuery } from "@tanstack/react-query";
import { withFallback } from "vike-react-query";
import { Error } from "#root/components/Query/Error";
import { Loading } from "#root/components/Query/Loading";
import { NoData } from "#root/components/Query/NoData";
import { ArticleList } from "#root/components/ArticleList/ArticleList";


const Articles = withFallback(
  () => {
    const result = useSuspenseQuery({
      queryKey: ["articles"],
      queryFn: () => fetchArticles()
    });
    const articles = result.data || [];

    return articles.length ? (
      <ArticleList articles={articles} />
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
