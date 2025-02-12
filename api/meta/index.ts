import { Meta } from "#root/types/Meta";
import request from "#root/utils/request";

export const fetchMetaByResource = async (
  resourceType: string,
  resourceId: number
): Promise<Meta[]> => request.get(`/meta/resource/${resourceType}/${resourceId}`)