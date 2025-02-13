import { Article } from "#root/api/article/type";
import request from "#root/utils/request";

export const fetchAbout = async (): Promise<Article> => request.get('/articles/about')
