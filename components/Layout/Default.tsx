import React from "react";
import Header from "#root/components/Header/Header";
import Footer from "#root/components/Footer/Footer";

export {
  Layout
}

function Layout(
  { children }:
    { children: React.ReactNode }
) {
  return (
    <div className="default-layout">
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}
