/**
 * API 服务基础配置
 */
import { API_BASE_URL, STORAGE_KEYS } from "@/constants";
import { ApiResponse } from "@/types";

/**
 * API 请求封装
 */
async function request<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== "undefined" 
    ? localStorage.getItem(STORAGE_KEYS.token) 
    : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ApiResponse<T> = await response.json();

  if (data.code !== 200) {
    throw new Error(data.message || "请求失败");
  }

  return data;
}

/**
 * GET 请求
 */
export const get = <T = any>(url: string, params?: Record<string, any>) => {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";
  return request<T>(`${url}${queryString}`, { method: "GET" });
};

/**
 * POST 请求
 */
export const post = <T = any>(url: string, data?: any) => {
  return request<T>(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * PUT 请求
 */
export const put = <T = any>(url: string, data?: any) => {
  return request<T>(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

/**
 * DELETE 请求
 */
export const del = <T = any>(url: string) => {
  return request<T>(url, { method: "DELETE" });
};

