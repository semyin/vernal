import { createUser, deleteUser, updateUser, queryKey } from ".";
import { useAction } from "../common/useAction";
import { User, UserFilters } from "./type";

export const useDeleteUser = (filters: UserFilters) => {
  return useAction<UserFilters, number, User>({
    fn: (id) => deleteUser(id),
    queryKey,
    filters
  });
};

export const useCreateUser = () => {
  return useAction<UserFilters, Partial<User>, User>({
    fn: (data) => createUser(data),
    queryKey
  });
};

export const useUpdateUser = () => {
  return useAction<UserFilters, { id: number, data: Partial<User> }, User>({
    fn: ({ id, data }) => updateUser(id, data),
    queryKey
  });
};