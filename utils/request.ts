import { navigate } from "vike/client/router";
import { API_PREFIX, HOST, isSSR, PORT } from "./environment";
import { render } from "vike/abort";
import { usePageContext } from "vike-react/usePageContext";

// 定义接口返回的数据结构
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 定义请求配置
export interface RequestConfig extends RequestInit {
  baseURL?: string;
  timeout?: number;
  params?: Record<string, string | number> | {}; // 新增 params 字段
}

// 创建统一的请求方法
const createFetch = (baseConfig: RequestConfig = {}) => {
  const { baseURL = "", timeout = 10000, ...restConfig } = baseConfig;

  // 请求拦截器
  const requestInterceptor = async (url: string, config: RequestConfig) => {
    // 在发送请求之前可以做一些处理
    let fullUrl = baseURL ? `${baseURL}${url}` : url;

    // 处理查询参数
    if (config.params) {
      const filteredParams = Object.fromEntries(
        Object.entries(config.params).filter(([_, value]) => value !== undefined)
      );
      const queryString = new URLSearchParams(
        filteredParams as Record<string, string>
      ).toString();
      fullUrl += `?${queryString}`;
    }

    // 超时处理
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const newConfig: RequestConfig = {
      ...config,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    };

    return { fullUrl, newConfig, timeoutId };
  };

  // 响应拦截器
  const responseInterceptor = async (response: Response) => {
    // 对响应数据做一些处理
    if (!response.ok) {
      if (response.status === 401) {
        // 服务端需要这样处理
        if (isSSR) {
          throw render("/admin/login");
        } else {
        }
      } else if (response.status === 404) {
        if (isSSR) {
          throw render(404);
        }
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
    }

    const data: ApiResponse = await response.json();
    const { code, message } = data;

    if (code !== 200) {
      // 处理业务逻辑错误
      if (code === 401) {
        navigate("/admin/login");
      } else if (code === 404) {
        navigate("/_error");
      } else {
        throw new Error(`API Error: ${message}`);
      }
    }

    return data.data; // 直接返回数据部分
  };

  // 统一的请求方法
  const request = async <T = any>(
    url: string,
    config: RequestConfig = {}
  ): Promise<T> => {
    let header;
    if (isSSR) {
      const pageContext = usePageContext();
      header = pageContext.headers;
    } else {
      header = {};
    }

    try {
      const { fullUrl, newConfig, timeoutId } = await requestInterceptor(url, {
        headers: { ...header },
        ...config,
      });

      const response = await fetch(fullUrl, newConfig);
      clearTimeout(timeoutId); // 清除超时定时器

      return await responseInterceptor(response);
    } catch (error) {
      // 对错误做一些处理
      if (error instanceof Error && error.name === "AbortError") {
        console.error("Request timeout:", error);
        throw new Error("Request timeout");
      } else {
        console.error("Request error:", error);
        throw error;
      }
    }
  };

  return {
    get: <T = any>(url: string, config?: RequestConfig) =>
      request<T>(url, { method: "GET", ...config }),
    post: <T = any>(url: string, data?: any, config?: RequestConfig) =>
      request<T>(url, {
        method: "POST",
        body: JSON.stringify(data),
        ...config,
      }),
    put: <T = any>(url: string, data?: any, config?: RequestConfig) =>
      request<T>(url, { method: "PUT", body: JSON.stringify(data), ...config }),
    delete: <T = any>(url: string, config?: RequestConfig) =>
      request<T>(url, { method: "DELETE", ...config }),
    patch: <T = any>(url: string, data?: any, config?: RequestConfig) =>
      request<T>(url, {
        method: "PATCH",
        body: JSON.stringify(data),
        ...config,
      }),
  };
};

const domain = isSSR ? `http://${HOST}:${PORT}` : "";
const baseURL = domain + API_PREFIX;

console.log("baseURL", baseURL);

// 创建实例
const request = createFetch({
  baseURL,
  timeout: 10000,
});

export default request;
