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
        {
          name && <Link href='/'>{name}</Link>
        }
        {
          description && <span className="title-desc">{description}</span>
        }
      </div>
    </header>
  )
}
