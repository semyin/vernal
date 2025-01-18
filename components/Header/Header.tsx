export default Header

import { usePageContext } from 'vike-react/usePageContext'
import styles from "./Header.module.scss"
import { Link } from "../Link/Link"

function Header() {

  const pageContext = usePageContext();
  const { name, description } = pageContext.site

  return (
    <header>
      <div className={styles.title}>
        <Link href='/'>{name}</Link>
        {
          true && <span className="title-desc">{'这是一个描述'}</span>
        }
      </div>
    </header>
  )
}
