import { TagDetail, Tag } from "./type";
import request from "#root/utils/request";

export const fetchTagDetail = async (id: number): Promise<TagDetail> => request.get(`/tags/${id}`)

export const fetchTags = async (
  params?: { name?: string }
): Promise<Tag[]> => request.get(`/tags`, { params })

export const createTag = async (
  data: Partial<Tag>
): Promise<Tag> => request.post("/tags", data)

export const updateTag = async (
  id: number,
  data: Partial<Tag>
): Promise<Tag> => request.put(`/tags/${id}`, data)

export const deleteTag = async (
  id: number,
): Promise<Tag> => request.delete(`/tags/${id}`)