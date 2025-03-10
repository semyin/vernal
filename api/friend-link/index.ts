import request from "#root/utils/request";
import { FriendLink, FriendLinkFilters } from "./type";

export const BASE_QUERY_KEY = "admin-friendLinks"

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

export const toggleFriendLinkVisible = async (
  id: number,
  data: { value: boolean }
): Promise<null> => request.patch("/friend-links/" + id + "/visible", data)