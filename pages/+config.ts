import vikeReact from 'vike-react/config'
import favicon from '../assets/favicon-256.png'
import vikeReactQuery from 'vike-react-query/config'

export default {

  stream: true,

  // favicon
  favicon,

  lang: 'zh-CN',

  // Setting to toggle SSR
  ssr: true,

  passToClient: [
    'site', 'metas'
  ],

  extends: [vikeReact, vikeReactQuery]
}
