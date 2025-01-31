export { SiteMeta };

import { Head } from "vike-react/Head";
import { Config } from "vike-react/Config";
import { SiteWithBaseMeta } from "#root/types/Site";

function SiteMeta({ site, meta }: SiteWithBaseMeta) {
  return (
    <>
      <Config title={`${site.name}`} />
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
