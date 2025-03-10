import { Category, CategoryFilters } from "./type";
import request from "#root/utils/request";

export const BASE_QUERY_KEY = "admin-categories"

export const fetchCategories = async (
  params?: CategoryFilters
): Promise<Category[]> => request.get("/categories", { params });

export const createCategory = async (
  data: Partial<Category>
): Promise<Category> => request.post("/categories", data)

export const updateCategory = async (
  id: number,
  data: Partial<Category>
): Promise<Category> => request.put("/categories/" + id, data)

export const deleteCategory = async (
  id: number
): Promise<Category> => request.delete("/categories/" + id)