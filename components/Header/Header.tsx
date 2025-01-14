export default Header

import styles from "./Header.module.scss"
import { Link } from "../Link/Link"

function Header() {

  const siteName = import.meta.env.VITE_SITE_NAME

  return (
    <header style={styles}>
      <div className={ styles.title }>{ siteName }</div>
      <div className="title-desc"></div>
      <Link href="/about">去about</Link>
    </header>
  )
}
