import { usePageContext } from "vike-react/usePageContext";
import Content from "./Content";

export { Page };

function Page() {
  const pageContext = usePageContext();
  return <Content id={pageContext.routeParams.id} />;
}
