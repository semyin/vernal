import { withFallback } from "vike-react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import MarkdownRenderer from "#root/components/Markdown/MarkdownRenderer";
import { Loading } from "#root/components/Query/Loading";
import { Error } from "#root/components/Query/Error";
import { fetchAbout } from "#root/api/about";
import styles from "./About.module.scss";


const About = withFallback(
  () => {
    const result = useSuspenseQuery({
      queryKey: ["about"],
      queryFn: () => fetchAbout(),
    });
    const about = result.data;
    return (
      <div className={styles["about"]}>
        <h1>{about.title}</h1>
        <MarkdownRenderer content={about.content} />
      </div>
    );
  },
  () => <Loading loadingText="Loading About Page..." />,
  ({ ...props }) => (
    <Error errorText="Failed To Load About Page with" {...props} />
  )
);

export { About };
