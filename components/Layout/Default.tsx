import React from "react";
import Header from "#root/components/Header/Header";
import Footer from "#root/components/Footer/Footer";
import styles from "#root/components/Layout/Default.module.scss"

export {
  Layout
}

function Layout(
  { children }:
    { children: React.ReactNode }
) {
  return (
    <div className={ styles['default-layout'] }>
      <div className={ styles['main-wrapper'] }>
        <Header/>
        {children}
        <Footer/>
      </div>
    </div>
  )
}
