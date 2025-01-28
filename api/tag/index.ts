import { TagDetail } from "#root/types/Tag";
import request from "#root/utils/request";

export const fetchTagDetail = async (id: number): Promise<TagDetail> => request.get(`/tags/${id}`)
