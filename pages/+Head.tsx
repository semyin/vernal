export { Head };

import  '../assets/css/reset.css'
import '../assets/css/app.css'
import { usePageContext } from 'vike-react/usePageContext';

function Head() {
  const pageContext = usePageContext()
  const { metas = [] } = pageContext

  return (
    <>
      {
        metas.map(item => {
          if (item.name) {
            return  <meta name={item.name} content={item.content} />
          }
          if (item.property) {
            return <meta property={item.property} content={item.content} />
          }
          return null
        })
      }
    </>
  );
}
