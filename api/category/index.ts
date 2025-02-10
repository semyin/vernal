import { Category } from "#root/types/Category";
import request from "#root/utils/request";

export const fetchCategories = async (): Promise<Category[]> => request.get("/categories");