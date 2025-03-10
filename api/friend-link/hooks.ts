import { QueryKey } from "@tanstack/react-query";
import {
  createFriendLink,
  deleteFriendLink,
  toggleFriendLinkVisible,
  updateFriendLink,
  BASE_QUERY_KEY
} from ".";
import { useAction } from "../common/useAction";
import { FriendLink } from "./type";

export const useDeleteFriendLink = (queryKey: QueryKey) => {
  return useAction<number, FriendLink>({
    fn: (id) => deleteFriendLink(id),
    queryKey
  });
};

export const useCreateFriendLink = () => {
  return useAction<Partial<FriendLink>, FriendLink>({
    fn: (data) => createFriendLink(data),
    queryKey: [BASE_QUERY_KEY],
    exact: true,
  });
};

export const useUpdateFriendLink = () => {
  return useAction<{ id: number, data: Partial<FriendLink> }, FriendLink>({
    fn: ({ id, data }) => updateFriendLink(id, data),
    queryKey: [BASE_QUERY_KEY],
    exact: true,
  });
};

export const useToggleFriendLinkVisible = (queryKey: QueryKey) => {
  return useAction<{ id: number; value: boolean }, null>({
    fn: ({ id, value }) => toggleFriendLinkVisible(id, { value }),
    queryKey
  });
};