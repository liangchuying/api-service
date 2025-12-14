"use client";

import { Layout } from "antd";

const { Content } = Layout;

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * 认证页面布局（登录页专用）
 * 居中显示，无导航栏
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}

