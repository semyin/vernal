export interface File {
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

export interface fileFilters {
  type?: string;
}
