import request from "#root/utils/request";

export interface LoginBody {
  username: string;
  password: string;
}
export const login = async (data: LoginBody): Promise<any> =>
  request.post("/auth/login", data);

export const logout = async (): Promise<any> => request.post("/auth/logout");
