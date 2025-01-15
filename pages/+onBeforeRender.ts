import { PageContext } from "vike/types"

export function onBeforeRender(pageContext: PageContext) {

  console.log('onBeforeRender!', 'pageContext.isClientSideNavigation', pageContext.isClientSideNavigation)
}
