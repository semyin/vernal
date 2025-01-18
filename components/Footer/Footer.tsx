export default Footer

import { usePageContext } from "vike-react/usePageContext"
import styles from "./Footer.module.scss"
import RunTimeDisplay from "./RunTimeDisplay"
import BackToTop from "./BackToTop"

function Footer() {

  const pageContext = usePageContext()
  const { copyright, icp, runTime } = pageContext.site

  return (
    <footer>
      <BackToTop />
      <ul className={styles['footer-list']}>
        <li>Theme Copied From <a href="https://yojigen.tech" target="_blank">MoeArthur</a>.</li>
        <li>Powered By <a href="https://github.com/semyin/vernal" target="_blank">Vernel</a> <RunTimeDisplay runTime={runTime} /></li>
        <li>{ copyright }{ icp }</li>
      </ul>
    </footer>
  )
}
