import request from "#root/utils/request";
import { PaginationOptions } from "#root/types/pagination.interface";
import { fileFilters, File } from "./type";

export const queryKey = "files";

export const uploadFile = async (data: FormData): Promise<File> =>
  request.post("/files/upload", data);

export const fetchFiles = async (
  params?: fileFilters & PaginationOptions
): Promise<File[]> => request.get(`/files`, { params });

export const deleteFile = async (
  id: number
): Promise<void> => request.delete(`/files/${id}`);
