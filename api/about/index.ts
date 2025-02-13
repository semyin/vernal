import { Article } from "#root/api/article/Article";
import request from "#root/utils/request";

export const fetchAbout = async (): Promise<Article> => request.get('/articles/about')
