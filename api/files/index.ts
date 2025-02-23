import request from "#root/utils/request";
import { File } from "buffer";
import { UploadResponse } from "./type";

interface UploadBody {
  file: File;
  type: string;
}

export const uploadFile = async (data: FormData): Promise<UploadResponse> =>
  request.post("/files/upload", data);
