"use client";

import { Layout, Menu, Avatar, Dropdown } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  user?: {
    name?: string;
    avatar?: string;
  };
}

/**
 * 页面头部组件
 */
export default function Header({ user }: HeaderProps) {
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "个人资料",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "设置",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      danger: true,
    },
  ];

  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ fontSize: 20, fontWeight: "bold", color: "#1677ff" }}>
        API Service
      </div>
      <div>
        {user ? (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Avatar
                src={user.avatar}
                icon={<UserOutlined />}
                size="default"
              />
              <span>{user.name || "用户"}</span>
            </div>
          </Dropdown>
        ) : (
          <Avatar icon={<UserOutlined />} size="default" />
        )}
      </div>
    </AntHeader>
  );
}

