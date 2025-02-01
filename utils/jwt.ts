export { parseJwt, checkJwt };

import { getCookieFromHeaders } from "./index";
import * as jose from "jose";

// 定义 JWT payload 的类型接口
interface JWTPayload {
  exp?: number;
  iat?: number;
  // 添加其他你需要的字段
  [key: string]: any; // 如果有其他动态字段
}

// 解析 jwt
const parseJwt = async (
  token: string
): Promise<{ expired: boolean; payload: JWTPayload | null }> => {
  try {
    // 解码 JWT 而不验证签名
    const payload = (await jose.decodeJwt(token)) as JWTPayload;

    const currentTime = Math.floor(Date.now() / 1000);
    const expired = payload.exp ? payload.exp < currentTime : true;

    return { expired, payload };
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return { expired: true, payload: null };
  }
};

// 检查 jwt 是否存在且未过期
const checkJwt = async (
  headers: Record<string, string> | null | undefined
): Promise<boolean> => {
  const jwtToken = getCookieFromHeaders(headers);

  if (!jwtToken) {
    return false;
  }

  try {
    const payload = (await jose.decodeJwt(jwtToken)) as JWTPayload;

    const currentTime = Math.floor(Date.now() / 1000);
    const expired = payload.exp ? payload.exp < currentTime : true;

    return !expired;
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return false;
  }
};
