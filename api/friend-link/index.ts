import request from "#root/utils/request";
import { FriendLink } from "#root/types/FriendLink";

export interface FriendLinkQuery {}
export const fetchFriendLinks = async (params?: FriendLinkQuery): Promise<FriendLink[]> => request.get('/friend-links', { params })