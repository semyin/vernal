import { useAction } from "../common/useAction";
import { deleteFile, queryKey } from "./index";
import { fileFilters } from "./type";

export const useDeleteFile = (filters: fileFilters) => {
  return useAction<fileFilters, number, void>({
    fn: (id: number) => deleteFile(id),
    queryKey,
    filters
  });
};

