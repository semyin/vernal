import { createMeta, deleteMeta, queryKey, updateMeta } from ".";
import { useAction } from "../common/useAction";
import { Meta, MetaFilters } from "./type";

export const useDeleteMeta = (filters: MetaFilters) => {
  return useAction<MetaFilters, number, Meta>({
    fn: (id) => deleteMeta(id),
    queryKey,
    filters
  });
};

export const useCreateMeta = () => {
  return useAction<MetaFilters, Partial<Meta>, Meta>({
    fn: (data) => createMeta(data),
    queryKey,
  });
};

export const useUpdateMeta = () => {
  return useAction<MetaFilters, { id: number, data: Partial<Meta> }, Meta>({
    fn: ({ id, data }) => updateMeta(id, data),
    queryKey,
  });
};