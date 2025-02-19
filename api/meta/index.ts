import { Meta, MetaFilters } from "./type";
import request from "#root/utils/request";
import { Pagination } from "#root/types/pagination.interface";

export const queryKey = "admin-metas";

export const fetchMetaByResource = async (
  resourceType: string,
  resourceId: number
): Promise<Meta[]> => request.get(`/meta/resource/${resourceType}/${resourceId}`)

export const fetchMetas = async (
  params: MetaFilters
): Promise<Pagination<Meta>> => request.get("/meta", { params });

export const createMeta = async (
  data: Partial<Meta>
): Promise<Meta> => request.post(`/meta`, data)

export const deleteMeta = async (
  id: number
): Promise<Meta> => request.delete(`/meta/${id}`)

export const updateMeta = async (
  id: number,
  data: Partial<Meta>
): Promise<Meta> => request.put(`/meta/${id}`, data)