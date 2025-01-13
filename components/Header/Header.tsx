export default Header

import styles from "./Header.module.scss"

function Header() {

  const siteName = import.meta.env.VITE_SITE_NAME

  return (
    <header style={styles}>
      <div className="title">{ siteName }</div>
      <div className="title-desc"></div>
    </header>
  )
}
