"use client";

import { useMemo, useState } from "react";
import { Layout, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import Header from "./Header";

const { Sider, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * 后台管理基础布局
 * 左侧导航 + 右侧内容区
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "/",
        icon: <DashboardOutlined />,
        label: "仪表盘",
      },
      {
        key: "/user/users",
        icon: <TeamOutlined />,
        label: "用户管理",
      },
      {
        key: "/role",
        icon: <SafetyOutlined />,
        label: "角色管理",
      },
      {
        key: "/posts",
        icon: <FileTextOutlined />,
        label: "内容管理",
      },
      {
        key: "/settings",
        icon: <SettingOutlined />,
        label: "系统设置",
      },
    ],
    []
  );

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key && typeof e.key === "string") {
      router.push(e.key);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        width={220}
        trigger={null}
        style={{
          background: "#001529",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: 0.5,
          }}
        >
          {collapsed ? "API" : "API Service"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // Compute a root-level selected key so nested routes (e.g. /users/1)
          // still highlight the parent menu item (/users)
          selectedKeys={[(() => {
            if (!pathname) return "/";
            if (pathname === "/") return "/";
            const parts = pathname.split("/").filter(Boolean);
            return parts.length ? `/${parts[0]}` : "/";
          })()]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        <Header />
        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: "#f5f5f5",
            minHeight: "calc(100vh - 64px - 32px)",
          }}
        >
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? "展开导航" : "折叠导航"}
            </Button>
          </div>
          <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

