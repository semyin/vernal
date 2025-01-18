export default Footer

import { usePageContext } from "vike-react/usePageContext"
import styles from "./Footer.module.scss"
import RunTimeDisplay from "./RunTimeDisplay"

function Footer() {

  const pageContext = usePageContext()
  const { copyright, icp, runTime } = pageContext.site

  return (
    <footer>
      <ul className={styles['footer-list']}>
        <li>{ copyright }</li>
        <li>Theme Copied From <a href="https://yojigen.tech" target="_blank">MoeArthur</a>.</li>
        <li>Powered By <a href="https://github.com/semyin/vernal" target="_blank">Vernel</a> <RunTimeDisplay runTime={runTime} /></li>
      </ul>
      <div className={styles.copyright}></div>
      <div></div>
      <div></div>
    </footer>
  )
}
