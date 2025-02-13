import { Category } from "./type";
import request from "#root/utils/request";

export const fetchCategories = async (): Promise<Category[]> => request.get("/categories");