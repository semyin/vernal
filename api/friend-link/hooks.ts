import { createFriendLink, deleteFriendLink, updateFriendLink } from ".";
import { useAction } from "../common/useAction";
import { FriendLink, FriendLinkFilter } from "./type";

export const useDeleteFriendLink = (filters: FriendLinkFilter) => {
  return useAction<FriendLinkFilter, number, FriendLink>({
    fn: (id) => deleteFriendLink(id),
    queryKey: "admin-firendLinks",
    filters
  });
};

export const useCreateFriendLink = () => {
  return useAction<FriendLinkFilter, Partial<FriendLink>, FriendLink>({
    fn: (data) => createFriendLink(data),
    queryKey: "admin-firendLinks"
  });
};

export const useUpdateFriendLink = () => {
  return useAction<FriendLinkFilter, { id: number, data: Partial<FriendLink> }, FriendLink>({
    fn: ({ id, data }) => updateFriendLink(id, data),
    queryKey: "admin-firendLinks"
  });
};