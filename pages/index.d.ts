// https://vike.dev/pageContext#typescript
import { Site } from "#root/types/Site"
import { Meta } from "#root/types/Meta"

declare global {
  namespace Vike {
    interface PageContext {
      abortReason: string | { notAdmin: true };
      // custom
      site: Site;
      meta: Meta[];
      isLogin: boolean
    }
  }
}
export {};
