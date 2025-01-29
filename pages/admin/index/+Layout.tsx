import React from "react"

export {
  Layout
}

function Layout(
  { children }: {
    children: React.ReactNode
  }
) {
  return (
    <div className="admin-layout">{children}</div>
  )
}
