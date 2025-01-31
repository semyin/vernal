import request from "#root/utils/request";
import { SiteWithBaseMeta } from "#root/types/Site";

export const fetchSiteConfig = async (): Promise<SiteWithBaseMeta> => request.get('/site/config')