import { Article } from "#root/types/Article";
import request from "#root/utils/request";
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
