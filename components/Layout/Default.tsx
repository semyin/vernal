import React from "react";
import Header from "#root/components/Header/Header";
import Footer from "#root/components/Footer/Footer";
import NavBar from "#root/components/NavBar/NavBar";
import styles from "#root/components/Layout/Default.module.scss"
import BackToTop from "#root/components/BackToTop/BackToTop";

export {
  Layout
}

function Layout(
  { children }:
    { children: React.ReactNode }
) {
  return (
    <div className={styles['default-layout']}>
      <div className={styles['main-wrapper']}>
        <Header />
        <NavBar />
        {children}
        <BackToTop />
        <Footer />
      </div>
    </div>
  )
}
