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
        fetchArticles()
    })
    const articles = result.data

    return (
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
      </ul>
    )
  },
  () => <div>Loading articles</div>,
  // The props `retry` and `error` are provided by vike-react-query
  // Other props, such as `code`, are provied by the parent component
  ({ retry, error }) => (
    <div>
      Failed to load articles
      <button onClick={() => retry()}>Retry</button>
    </div>
  )
)

export default Articles;
