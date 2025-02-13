import { TagDetail, Tag } from "#root/types/Tag";
import request from "#root/utils/request";

export const fetchTagDetail = async (id: number): Promise<TagDetail> => request.get(`/tags/${id}`)

export const fetchTags = async (
  params?: { name?: string }
): Promise<Tag[]> => request.get(`/tags`, { params })
