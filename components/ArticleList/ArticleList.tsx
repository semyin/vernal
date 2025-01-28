export { ArticleList };

import { format } from "date-fns";
import { Article } from "#root/types/Tag";
import { Link } from "../Link/Link";
import styles from "./ArticleList.module.scss";

function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul className={styles["article-list"]}>
      {articles.map((item) => {
        return (
          <li key={item.id}>
            <span>
              <i>
                <time dateTime={item.updatedAt}>
                  {format(item.createdAt, "yyyy-MM-dd")}
                </time>
              </i>
            </span>
            <Link href={`/post/${item.id}`}>{item.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
