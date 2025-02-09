import request from "#root/utils/request";
import { File } from "buffer";

interface UploadBody {
  file: File;
  type: string;
}

export interface UploadResponse {
  id: number;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  type: string;
  url: string;
  cosKey: string;
  createdAt: string;
  updatedAt: string;
}
export const uploadFile = async (data: FormData): Promise<UploadResponse> =>
  request.post("/files/upload", data);
