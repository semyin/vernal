import { createFriendLink, deleteFriendLink, updateFriendLink } from ".";
import { useAction } from "../common/useAction";
import { FriendLink, FriendLinkFilters } from "./type";

export const useDeleteFriendLink = (filters: FriendLinkFilters) => {
  return useAction<FriendLinkFilters, number, FriendLink>({
    fn: (id) => deleteFriendLink(id),
    queryKey: "admin-friendLinks",
    filters
  });
};

export const useCreateFriendLink = () => {
  return useAction<FriendLinkFilters, Partial<FriendLink>, FriendLink>({
    fn: (data) => createFriendLink(data),
    queryKey: "admin-friendLinks"
  });
};

export const useUpdateFriendLink = () => {
  return useAction<FriendLinkFilters, { id: number, data: Partial<FriendLink> }, FriendLink>({
    fn: ({ id, data }) => updateFriendLink(id, data),
    queryKey: "admin-friendLinks"
  });
};