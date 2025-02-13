// https://vike.dev/pageContext#typescript
import { Site } from "#root/api/site-config/type"
import { Meta } from "#root/api/meta/type"

declare global {
  namespace Vike {
    interface PageContext {
      abortReason: string
      // custom
      site: Site;
      meta: Meta[];
      isLogin: boolean
    }
  }
}
export {};
