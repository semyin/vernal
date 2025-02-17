import { useAction } from "../common/useAction";
import { createCategory, deleteCategory, updateCategory } from "./index";
import { Category, CategoryFilters } from "./type";

export const useDeleteCategory = (filters: CategoryFilters) => {
  return useAction<CategoryFilters, number, Category>({
    fn: (id: number) => deleteCategory(id),
    queryKey: "admin-categories",
    filters
  });
};

export const useCreateCategory = () => {
  return useAction<CategoryFilters, Partial<Category>, Category>({
    fn: (data) => createCategory(data),
    queryKey: "admin-categories",
    successMessage: "create successfully",
    errorMessage: "create falied"
  });
};

export const useUpdateCategory = () => {
  return useAction<CategoryFilters, { id: number; data: Partial<Category> }, Category>({
    fn: ({ id, data }) => updateCategory(id, data),
    queryKey: "admin-categories",
    successMessage: "update successfully",
    errorMessage: "update falied"
  });
};


