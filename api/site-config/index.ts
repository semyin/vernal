import request from "#root/utils/request";
import { Site, SiteWithBaseMeta } from "./type";

export const queryKey = "admin-site"

export const fetchSiteConfig = async (): Promise<SiteWithBaseMeta> => request.get('/site/config')

export const fetchSite = async (): Promise<Site> => request.get("/site")

export const updateSite = async (
  data: Partial<Site>
): Promise<null> => request.put("/site", data)