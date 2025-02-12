import { Article } from "#root/types/Article";
import request from "#root/utils/request";
import { useMutation } from '@tanstack/react-query';
import { Pagination } from "#root/types/pagination.interface";

export interface ArticleQuery {
  title?: string;
  withTags?: boolean;
  withMetas?: boolean;
  [key: string]: any;
}

export const fetchArticles = async (
  params?: ArticleQuery
): Promise<Article[]> => request.get("/articles", { params });

export const fetchArticleDetail = async (id: number): Promise<Article> =>
  request.get(`/articles/${id}`);

export const fetchManageArticles = async (
  params?: ArticleQuery
): Promise<Pagination<Article>> => request.get("/articles/manage", { params });

export const createArticle = async (
  data: Partial<Article>
): Promise<Pagination<Article>> => request.post("/articles/manage", data);

export const getArticleDetail = async (
  id: number
): Promise<Article> => request.get(`/articles/manage/${id}`);

export const updateArticle = async (
  id: number,
  data: Partial<Article>
): Promise<null> => request.put(`/articles/manage/${id}`, data)

export const deleteArticle = async (
  id: number
): Promise<null> => request.delete(`/articles/manage/${id}`)

export const updatePublishStatus = async (
  id: number,
  data: { isPublished: boolean }
): Promise<null> => request.patch(`/articles/manage/${id}/publish`, data)

export const updateTopStatus = async (
  id: number,
  data: { isTop: boolean }
): Promise<null> => request.patch(`/articles/manage/${id}/top`, data)
