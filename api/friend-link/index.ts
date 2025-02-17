import request from "#root/utils/request";
import { FriendLink, FriendLinkFilter } from "./type";

export const fetchFriendLinks = async (
  params?: FriendLinkFilter
): Promise<FriendLink[]> => request.get('/friend-links', { params })

export const createFriendLink = async (
  data: Partial<FriendLink>
): Promise<FriendLink> => request.post("/friend-links", data)

export const updateFriendLink = async (
  id: number,
  data: Partial<FriendLink>
): Promise<FriendLink> => request.put("/friend-links/" + id, data)

export const deleteFriendLink = async (
  id: number
): Promise<FriendLink> => request.delete("/friend-links/" + id)