export { SiteConfigHead };

import { Head } from "vike-react/Head";
import { Config } from "vike-react/Config";
import { SiteWithBaseMeta } from "#root/types/Site";

interface Props extends SiteWithBaseMeta {
  titlePrefix?: string;
  titleSuffix?: string;
}

function SiteConfigHead({ site, meta, titlePrefix, titleSuffix }: Props) {
  let title = site?.name;
  if (titlePrefix) {
    title = titlePrefix + title
  }
  if (titleSuffix) {
    title = title + titleSuffix
  }
  return (
    <>
      <Config title={title} />
      <Head>
        {meta.map((item) => {
          if (item.name && item.content) {
            return (
              <meta key={item.id} name={item.name} content={item.content} />
            );
          }
          if (item.property && item.content) {
            return (
              <meta
                key={item.id}
                property={item.property}
                content={item.content}
              />
            );
          }
          return null;
        })}
      </Head>
    </>
  );
}
