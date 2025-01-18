export default NavBar

import { Link } from "../Link/Link"
import styles from "./NavBar.module.scss"

function NavBar() {
  return (
    <nav>
      <ul className={styles['nav-list']}>
        <li><Link href="/">首页</Link></li>
        <li><Link href="/friend">友情链接</Link></li>
        <li><Link href="/">RSS</Link></li>
        <li><Link href="/about">关于</Link></li>
      </ul>
    </nav>
  )
}
