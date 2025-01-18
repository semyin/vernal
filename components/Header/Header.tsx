export default Header

import { usePageContext } from 'vike-react/usePageContext'
import styles from "./Header.module.scss"
import { Link } from "../Link/Link"

function Header() {

  const pageContext = usePageContext();
  const { name } = pageContext.site

  return (
    <header style={styles}>
      <div className={ styles.title }>{ name }</div>
      <div className="title-desc"></div>
      <Link href="/about">去about</Link>
    </header>
  )
}
