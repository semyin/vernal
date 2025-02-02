import { Article } from "#root/types/Article";
import request from "#root/utils/request";

export interface ArticleQuery {
  title?: string;
  withTags?: boolean;
  withMetas?: boolean;
}

export const fetchArticles = async (
  params?: ArticleQuery
): Promise<Article[]> => request.get("/articles", { params });

export const fetchArticleDetail = async (id: number): Promise<Article> =>
  request.get(`/articles/${id}`);

export const fetchManageArticles = async (
  params?: ArticleQuery
): Promise<Article[]> => request.get("/articles/manage", { params });
