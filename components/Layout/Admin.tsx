export { Layout };

import { useSiteConfig } from "#root/hooks/useSiteConfig";

function Layout({ children }: { children: React.ReactNode }) {
  const { site, meta } = useSiteConfig();
  return <div className="admin-layout">{children}</div>;
}
