export { getCookieFromHeaders };

// 从 headers 中提取 cookie
const getCookieFromHeaders = (
  headers: Record<string, string> | null | undefined
): string | null => {
  if (!headers) return null;
  const cookieHeader = headers.cookie || headers.Cookie; // 注意大小写
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "jwt") {
      return value;
    }
  }

  return null;
};
