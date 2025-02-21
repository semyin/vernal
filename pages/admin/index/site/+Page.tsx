export { Page };

import { useState } from "react";
import { SiteTable } from "./SiteTable";
import { SiteModal } from "./SiteModal";
import { Site } from "#root/api/site-config/type";

function Page() {

  const [visible, setVisible] = useState(false)
  const [site, setSite] = useState<Site>({
    id: 1,
    name: "",
    url: "",
    description: "",
    copyright: "",
    icp: "",
    runTime: ""
  })

  const handleOpenModal = (data: Site) => {
    setSite(data)
    setVisible(true);
  }

  return <>
    <SiteTable onEdit={handleOpenModal} />
    <SiteModal
      visible={visible}
      site={site}
      onCancel={() => setVisible(false)}
    />
  </>
}
