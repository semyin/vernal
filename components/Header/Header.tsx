export default Header

import styles from "./Header.module.scss"
import { Link } from "../Link/Link"
import { Site } from '#root/types/Site'

function Header({ site }: {site: Site}) {

  const { name, description } = site

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
