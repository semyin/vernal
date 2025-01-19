import { fetchArticles } from '#root/api/article'
import { Link } from '#root/components/Link/Link'
import { useSuspenseQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { withFallback } from 'vike-react-query'
import styles from './Articles.module.scss'

const Articles = withFallback(
  () => {
    const result = useSuspenseQuery({
      queryKey: ['articles'],
      queryFn: () =>
        fetchArticles({ title: 'fdjshfk' })
    })
    const articles = result.data || []

    return (
      articles.length ?
      <ul className={styles['article-list']}>
        {
          articles.map(item => {
            return (
              <li key={item.id}>
                <span><i><time dateTime={item.updatedAt}>{format(item.createdAt, 'yyyy-MM-dd')}</time></i></span>
                <Link href={`/post/${item.id}`}>{item.title}</Link>
              </li>
            )
          })
        }
      </ul> : <div className={styles['center-block']}><i>No data here</i></div>
    )
  },
  () => <div className={styles['center-block']}>Loading articles</div>,
  // The props `retry` and `error` are provided by vike-react-query
  // Other props, such as `code`, are provied by the parent component
  ({ retry, error }) => (
    <div className={styles['center-block']}>
      Failed to load articles with: { error.message }
      <a onClick={() => retry()}>Retry</a>
    </div>
  )
)

export default Articles;
