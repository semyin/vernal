import { PageContext } from "vike/types";

export default (pageContext: PageContext) => {
  return pageContext.site?.name + "-管理后台";
};
