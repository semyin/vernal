import { QueryKey } from "@tanstack/react-query";
import { useAction } from "../common/useAction";
import { deleteFile } from "./index";

export const useDeleteFile = (queryKey: QueryKey) => {
  return useAction<number, void>({
    fn: (id: number) => deleteFile(id),
    queryKey
  });
};