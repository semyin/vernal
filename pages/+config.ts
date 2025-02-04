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

  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // 禁用窗口聚焦时重新请求
        refetchOnMount: false, // 禁用组件重新挂载时重新请求
        retry: 0, // 失败重试次数为0
      }
    }
  },

  passToClient: [
    'site', 'meta'
  ],

  extends: [vikeReact, vikeReactQuery]
}
