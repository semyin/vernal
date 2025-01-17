export default Header

import { usePageContext } from 'vike-react/usePageContext'
import styles from "./Header.module.scss"
import { Link } from "../Link/Link"

function Header() {

  const pageContext = usePageContext()
  // console.log('Header:', pageContext.siteConfig);

  const siteName = pageContext.siteConfig.site.name
  // const siteName = import.meta.env.VITE_SITE_NAME

  return (
    <header style={styles}>
      <div className={ styles.title }>{ siteName }</div>
      <div className="title-desc"></div>
      <Link href="/about">去about</Link>
    </header>
  )
}
