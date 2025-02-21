import { createUser, deleteUser, updateUser, queryKey } from ".";
import { useAction } from "../common/useAction";
import { User, UserFilter } from "./type";

export const useDeleteUser = (filters: UserFilter) => {
  return useAction<UserFilter, number, User>({
    fn: (id) => deleteUser(id),
    queryKey,
    filters
  });
};

export const useCreateUser = () => {
  return useAction<UserFilter, Partial<User>, User>({
    fn: (data) => createUser(data),
    queryKey
  });
};

export const useUpdateUser = () => {
  return useAction<UserFilter, { id: number, data: Partial<User> }, User>({
    fn: ({ id, data }) => updateUser(id, data),
    queryKey
  });
};