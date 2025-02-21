import request from "#root/utils/request";
import { User, UserFilter } from "./type"

export const queryKey = "admin-users"

export const fetchUsers = async (
  params: UserFilter
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