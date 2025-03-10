import request from "#root/utils/request";
import { User, UserFilters } from "./type"

export const BASE_QUERY_KEY = "admin-users"

export const fetchUsers = async (
  params: UserFilters
): Promise<User[]> => request.get("/users", { params })

export const createUser = async (
  data: Partial<User>
): Promise<User> => request.post("/users", data)

export const updateUser = async (
  id: number,
  data: Partial<User>
): Promise<User> => request.put("/users/" + id, data)

export const deleteUser = async (
  id: number
): Promise<User> => request.delete("/users/" + id)

export const fetchUserDetail = async (
  id: number
): Promise<User> => request.get("/users/" + id)