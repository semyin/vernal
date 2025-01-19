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
        <li><i>Theme Copied From <a href="https://yojigen.tech" target="_blank">MoeArthur</a>.</i></li>
        <li><i>{ copyright } <a href="https://beian.miit.gov.cn/" target="_blank">{ icp }</a></i></li>
        <li><i>Powered By <a href="https://github.com/semyin/vernal" target="_blank">Vernel</a></i> <RunTimeDisplay runTime={runTime} /></li>
      </ul>
    </footer>
  )
}
