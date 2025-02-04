export { Link }

import { CSSProperties } from 'react';
import { usePageContext } from 'vike-react/usePageContext'

function Link({ href, children, style }: { href: string; children: string, style?: CSSProperties| undefined }) {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext
  const isActive = href === '/' ? urlPathname === href : urlPathname.startsWith(href)
  return (
    <a style={{ ...style }} href={href} className={isActive ? 'is-active' : undefined}>
      {children}
    </a>
  )
}
