import { QueryKey } from "@tanstack/react-query";
import { createUser, deleteUser, updateUser, BASE_QUERY_KEY } from ".";
import { useAction } from "../common/useAction";
import { User, UserFilters } from "./type";

export const useDeleteUser = (queryKey: QueryKey) => {
  return useAction<number, User>({
    fn: (id) => deleteUser(id),
    queryKey
  });
};

export const useCreateUser = () => {
  return useAction<Partial<User>, User>({
    fn: (data) => createUser(data),
    queryKey: [BASE_QUERY_KEY],
    exact: true,
  });
};

export const useUpdateUser = () => {
  return useAction<{ id: number, data: Partial<User> }, User>({
    fn: ({ id, data }) => updateUser(id, data),
    queryKey: [BASE_QUERY_KEY],
    exact: true,
  });
};