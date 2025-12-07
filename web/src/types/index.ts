/**
 * 全局类型定义
 */

// API 响应基础类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 分页请求参数
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// 分页响应数据
export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 用户信息
export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  roles?: string[];
}

