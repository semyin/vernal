import React from "react"

export {
  Layout
}

function Layout(
  { children }:
    { children: React.ReactNode }
) {
  return (
    <div className="default-layout">{children}</div>
  )
}
