/**
 * 工具函数
 */

/**
 * 格式化日期时间
 */
export const formatDateTime = (date: Date | string | number, format = "YYYY-MM-DD HH:mm:ss"): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
};

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      func(...args);
      lastTime = now;
    }
  };
}

/**
 * 获取本地存储
 */
export const getStorage = <T = any>(key: string, defaultValue?: T): T | null => {
  if (typeof window === "undefined") return defaultValue || null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : (defaultValue || null);
  } catch {
    return defaultValue || null;
  }
};

/**
 * 设置本地存储
 */
export const setStorage = <T = any>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to set storage:", error);
  }
};

/**
 * 移除本地存储
 */
export const removeStorage = (key: string): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};

