export { Layout };

import Header from "#root/components/Header/Header";
import Footer from "#root/components/Footer/Footer";
import NavBar from "#root/components/NavBar/NavBar";
import styles from "#root/components/Layout/Default.module.scss";
import { useSiteConfig } from "#root/hooks/useSiteConfig";
import { SiteMeta } from "./SiteMeta";
import "../../assets/css/reset.css";
import "../../assets/css/app.css";

function Layout({ children }: { children: React.ReactNode }) {
  const { site, meta } = useSiteConfig();
  return (
    <>
      <SiteMeta site={site} meta={meta} />
      <div className={styles["default-layout"]}>
        <div className={styles["main-wrapper"]}>
          <Header site={site} />
          <NavBar />
          <main className={styles["content"]}>{children}</main>
          <Footer site={site} />
        </div>
      </div>
    </>
  );
}
