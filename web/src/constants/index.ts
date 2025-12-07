/**
 * 全局常量配置
 */

// API 配置
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

// 应用配置
export const APP_CONFIG = {
  name: "API Service",
  version: "1.0.0",
  description: "API Service Web Application",
} as const;

// 路由配置
export const ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
} as const;

// 存储键名
export const STORAGE_KEYS = {
  token: "auth_token",
  user: "user_info",
  theme: "theme",
} as const;

