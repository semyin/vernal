// https://vike.dev/pageContext#typescript
import { Site } from "#root/types/Site"
import { Meta } from "#root/types/Meta"

interface SiteConfig {
  site: Site,
  metas: Meta[]
}

declare global {
  namespace Vike {
    interface PageContext {
      abortReason:
        | string
        | { notAdmin: true }
      siteConfig: SiteConfig
    }
  }
}
export {}
