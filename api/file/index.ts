import request from "#root/utils/request";
import { Pagination, PaginationOptions } from "#root/types/pagination.interface";
import { fileFilters, File } from "./type";

export const BASE_QUERY_KEY = "admin-files";

export const uploadFile = async (data: FormData): Promise<File> =>
  request.post("/files/upload", data);

export const fetchFiles = async (
  params?: fileFilters & PaginationOptions
): Promise<Pagination<File>> => request.get(`/files`, { params });

export const deleteFile = async (
  id: number
): Promise<void> => request.delete(`/files/${id}`);
