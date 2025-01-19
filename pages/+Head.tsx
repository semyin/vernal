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
          if (item.name && item.content) {
            return  <meta key={item.id} name={item.name} content={item.content} />
          }
          if (item.property && item.content) {
            return <meta key={item.id} property={item.property} content={item.content} />
          }
          return null
        })
      }
    </>
  );
}
