export default Header

function Header() {

  const SITE_NAME = import.meta.env.VITE_SITE_NAME
  console.log(SITE_NAME);

  return (
    <header></header>
  )
}
