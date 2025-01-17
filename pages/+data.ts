export {
  data
}

import { PageContext } from "vike/types"


async function data(pageContext: PageContext) {

  await fetch('http://localhost:3000/api/site/config').then(res => res.json()).then(res => {
    // console.log(res.data);
    pageContext.siteConfig = res.data
  })

  // const { isClientSideNavigation } = pageContext
  // if (!isClientSideNavigation) {

  // }
  // // console.log('onBeforeRender!', 'pageContext.isClientSideNavigation', pageContext.isClientSideNavigation)
  return {}
}
