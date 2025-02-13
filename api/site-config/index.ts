import request from "#root/utils/request";
import { SiteWithBaseMeta } from "./type";

export const fetchSiteConfig = async (): Promise<SiteWithBaseMeta> => request.get('/site/config')