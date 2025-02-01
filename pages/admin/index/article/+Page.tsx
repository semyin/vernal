export { Page };

import { fetchManageArticles } from "#root/api/article";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";

function Page() {

  
  

  const articles = useSuspenseQuery({
    queryKey: ["admin-articles"],
    queryFn: () => fetchManageArticles()
  });
  function getArticles() {
    fetchManageArticles();
  }
  useEffect(() => {});

  return (
    <>
      article
      <button onClick={getArticles}>getArticles</button>
    </>
  );
}
