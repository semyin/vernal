import { QueryKey } from "@tanstack/react-query";
import { useAction } from "../common/useAction";
import { createCategory, deleteCategory, updateCategory, BASE_QUERY_KEY } from ".";
import { Category } from "./type";

export const useDeleteCategory = (queryKey: QueryKey) => {
  return useAction<number, Category>({
    fn: (id: number) => deleteCategory(id),
    queryKey
  });
};

export const useCreateCategory = () => {
  return useAction<Partial<Category>, Category>({
    fn: (data) => createCategory(data),
    queryKey: [BASE_QUERY_KEY],
    exact: false,
    successMessage: "create successfully",
    errorMessage: "create falied"
  });
};

export const useUpdateCategory = () => {
  return useAction<{ id: number; data: Partial<Category> }, Category>({
    fn: ({ id, data }) => updateCategory(id, data),
    queryKey: [BASE_QUERY_KEY],
    exact: false,
    successMessage: "update successfully",
    errorMessage: "update falied"
  });
};


