import request from "#root/utils/request";
import { Meta, MetaFilters } from "./type";
import { Pagination, PaginationOptions } from "#root/types/pagination.interface";

export const queryKey = "admin-metas";

export const fetchMetaByResource = async (
  resourceType: string,
  resourceId: number
): Promise<Meta[]> => request.get(`/metas/resource/${resourceType}/${resourceId}`)

export const fetchMetas = async (
  params: MetaFilters & PaginationOptions
): Promise<Pagination<Meta>> => request.get("/metas", { params });

export const fetchMetaDetail = async (
  id: number
): Promise<Meta> => request.get(`/metas/${id}`)

export const createMeta = async (
  data: Partial<Meta>
): Promise<Meta> => request.post(`/metas`, data)

export const deleteMeta = async (
  id: number
): Promise<Meta> => request.delete(`/metas/${id}`)

export const updateMeta = async (
  id: number,
  data: Partial<Meta>
): Promise<Meta> => request.put(`/metas/${id}`, data)