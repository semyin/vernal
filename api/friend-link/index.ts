import request from "#root/utils/request";
import { FriendLink, FriendLinkFilters } from "./type";

export const fetchFriendLinks = async (
  params?: FriendLinkFilters
): Promise<FriendLink[]> => request.get('/friend-links', { params })

export const fetchFriendLinkDetail = async (
  id: number
): Promise<FriendLink> => request.get("/friend-links/" + id)

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