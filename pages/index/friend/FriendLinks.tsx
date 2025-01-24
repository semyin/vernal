import { withFallback } from "vike-react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { NoData } from "#root/components/Query/NoData";
import { Loading } from "#root/components/Query/Loading";
import { Error } from "#root/components/Query/Error";
import { Avatar } from "#root/components/Avatar/Avatar";
import { fetchFriendLinks } from "#root/api/friend-link";
import styles from "./FriendLinks.module.scss"


const FriendLinks = withFallback(
  () => {
    const result = useSuspenseQuery({
      queryKey: ["friendLinks"],
      queryFn: () => fetchFriendLinks(),
    });

    const friendLinks = result.data || [];

    return (
      friendLinks.length ?
      <div className={styles['friend-link-list']}>
        {
           friendLinks.map(item => {
            return <div className={styles['item']} key={item.id}>
              <Avatar avatarUrl={item.avatarUrl} url={item.url} name={item.name}/>
              <div className={styles['right-info']}>
                <p>名称：{item.name}</p>
                <p>简介：{item.description}</p>
                <p><span>链接：</span><a href={item.url} target="_blank">{item.url}</a></p>
              </div>
            </div>
          })
        }
      </div> : <NoData text="No Friend Link" />
    ) 
  },
  () => <Loading loadingText="Loading Friend Links..." />,
  ({ ...props }) => (
    <Error errorText="Failed To Load Friend Links with" {...props} />
  )
);

export { FriendLinks };
