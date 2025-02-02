export { Page };

import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchManageArticles } from "#root/api/article";

function Page() {

  const { data, error } = useSuspenseQuery({
    queryKey: ["admin-articles"],
    queryFn: () => fetchManageArticles({})
  });

  // console.log(articles.data);
  
  function getArticles() {
    fetchManageArticles({});
  }
  useEffect(() => {});

  return (
    <>
      article
      <button onClick={getArticles}>getArticles</button>
    </>
  );
}
