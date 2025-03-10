import { QueryKey } from "@tanstack/react-query";
import { createMeta, deleteMeta, BASE_QUERY_KEY, updateMeta } from ".";
import { useAction } from "../common/useAction";
import { Meta } from "./type";

export const useDeleteMeta = (queryKey: QueryKey) => {
  return useAction<number, Meta>({
    fn: (id) => deleteMeta(id),
    queryKey
  });
};

export const useCreateMeta = () => {
  return useAction<Partial<Meta>, Meta>({
    fn: (data) => createMeta(data),
    queryKey: [BASE_QUERY_KEY],
    exact: true
  });
};

export const useUpdateMeta = () => {
  return useAction<{ id: number, data: Partial<Meta> }, Meta>({
    fn: ({ id, data }) => updateMeta(id, data),
    queryKey: [BASE_QUERY_KEY],
    exact: true
  });
};