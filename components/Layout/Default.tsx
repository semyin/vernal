import React from "react";
import Header from "#root/components/Header/Header";
import Footer from "#root/components/Footer/Footer";
import NavBar from "#root/components/NavBar/NavBar";
import styles from "#root/components/Layout/Default.module.scss"

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
        <main className={styles["content"]}>{children}</main>
        <Footer />
      </div>
    </div>
  )
}
