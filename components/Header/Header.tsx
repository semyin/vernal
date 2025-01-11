export default Header

function Header() {

  const siteName = import.meta.env.VITE_SITE_NAME

  return (
    <header>
      <div className="header-wrapper">
        <div className="title">{ siteName }</div>
        <div className="title-desc"></div>
      </div>
    </header>
  )
}
