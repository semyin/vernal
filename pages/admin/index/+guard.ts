export { guard };

import type { GuardAsync } from "vike/types";
import { checkJwt } from "#root/utils/jwt";
import { render } from "vike/abort";

const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {

  const headers = pageContext.headersOriginal as Record<string, string>;

  const isLogin = await checkJwt(headers);

  pageContext.isLogin = isLogin

  if (!isLogin) {
    throw render("/admin/login");
  }
};
