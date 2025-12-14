"use client";

import { use } from "react";
import { Card, Descriptions, Typography, Button, Space } from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title } = Typography;

/**
 * 用户详情页面
 */
export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  // 模拟用户数据
  const user = {
    id,
    name: "Alice",
    email: "alice@example.com",
    phone: "13800138000",
    role: "管理员",
    status: "正常",
    createdAt: "2025-01-01 10:00:00",
    updatedAt: "2025-12-01 12:30:00",
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/user/users")}
        >
          返回
        </Button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>
          用户详情
        </Title>
        <Button type="primary" icon={<EditOutlined />}>
          编辑
        </Button>
      </div>

      <Card>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="用户ID">{user.id}</Descriptions.Item>
          <Descriptions.Item label="用户名">{user.name}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{user.email}</Descriptions.Item>
          <Descriptions.Item label="手机号">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="角色">{user.role}</Descriptions.Item>
          <Descriptions.Item label="状态">{user.status}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{user.createdAt}</Descriptions.Item>
          <Descriptions.Item label="更新时间">{user.updatedAt}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

