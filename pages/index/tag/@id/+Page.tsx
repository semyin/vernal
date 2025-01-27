import { usePageContext } from "vike-react/usePageContext";
import Tag from "./Tag";

export { Page };

function Page() {
  const pageContext = usePageContext()
  return (
    <Tag id={pageContext.routeParams.id} />
  )
}