import { fetchArticles } from '#root/api/article'
import { useSuspenseQuery } from '@tanstack/react-query'
import { withFallback } from 'vike-react-query'

const Articles = withFallback(
  () => {
    const result = useSuspenseQuery({
      queryKey: ['articles'],
      queryFn: () =>
        fetchArticles()
    })


    return (
      <div>
       {JSON.stringify(result)}
      </div>
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
