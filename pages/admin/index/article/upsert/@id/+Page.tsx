import { usePageContext } from "vike-react/usePageContext";
import { UpsertArticle } from "../UpsertArticle";

export { Page };

function Page() {
  const pageContext = usePageContext();
  return <>
    <UpsertArticle id={pageContext.routeParams.id} />
  </>
}
