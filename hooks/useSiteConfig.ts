import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchSiteConfig } from "#root/api/site-config";
import { usePageContext } from "vike-react/usePageContext";

export function useSiteConfig() {
  const pageContext = usePageContext()
  const siteConfig = useSuspenseQuery({
    queryKey: ["site-config"],
    queryFn: () => {
      console.log("load site config...");
      return fetchSiteConfig();
    },
  });
  pageContext.site = siteConfig.data.site
  pageContext.meta = siteConfig.data.meta

  return siteConfig.data;
}
