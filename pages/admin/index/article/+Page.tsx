import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchManageArticles } from "#root/api/article";
import { withFallback } from "vike-react-query";

const Page = withFallback(
  () => {
    const result = useSuspenseQuery({
      queryKey: ["admin-articles"],
      queryFn: () =>
        fetchManageArticles({
          // isTop: false,
          // isPublished: false,
          // withMetas: true,
          // withTags: true,
        }),
    });

    return <>{JSON.stringify(result.data.items)}</>;
  },
  () => "",
  () => ""
);

export { Page };

// function Page() {

//   // console.log(articles.data);

//   function getArticles() {
//     fetchManageArticles({});
//   }
//   useEffect(() => {});

//   return (
//     <>
//       article
//       <button onClick={getArticles}>getArticles</button>
//     </>
//   );
// }
