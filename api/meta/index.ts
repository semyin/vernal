import { Meta } from "#root/types/Meta";
import request from "#root/utils/request";

export const fetchMetaByResource = async (
  resourceType: string,
  resourceId: number
): Promise<Meta[]> => request.get(`/meta/resource/${resourceType}/${resourceId}`)

export const createMeta = async (
  data: Partial<Meta>
): Promise<Meta[]> => request.post(`/meta`, data)

export const deleteMeta = async (
  id: number
): Promise<Meta[]> => request.delete(`/meta/${id}`)

export const updateMeta = async (
  id: number,
  data: Partial<Meta>
): Promise<Meta[]> => request.put(`/meta/${id}`, data)