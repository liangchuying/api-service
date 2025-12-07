/**
 * Ant Design 配置
 * 统一配置 Ant Design 主题和全局设置
 */
import { ConfigProviderProps } from "antd/es/config-provider";

export const antdConfig: ConfigProviderProps = {
  // 主题配置
  theme: {
    token: {
      // 主色
      colorPrimary: "#1677ff",
      // 圆角
      borderRadius: 6,
      // 字体
      fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
  },
  // 其他配置
  locale: undefined, // 在 layout.tsx 中设置
};

