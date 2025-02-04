// https://vike.dev/pageContext#typescript
import { Site } from "#root/types/Site"
import { Meta } from "#root/types/Meta"

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
