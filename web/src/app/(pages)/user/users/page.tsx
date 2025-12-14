"use client";

import Link from "next/link";
import { Card, List, Typography, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Carol", email: "carol@example.com" },
];

/**
 * 用户管理页面
 */
export default function UsersPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>
          用户管理
        </Title>
        <Button type="primary" icon={<PlusOutlined />}>
          新建用户
        </Button>
      </div>
      <Card>
        <List
          dataSource={users}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Link key="view" href={`/user/users/${item.id}`}>
                  查看
                </Link>,
                <a key="edit" href="#">
                  编辑
                </a>,
                <a key="delete" href="#" style={{ color: "#ff4d4f" }}>
                  删除
                </a>,
              ]}
            >
              <List.Item.Meta
                title={<Link href={`/user/users/${item.id}`}>{item.name}</Link>}
                description={`邮箱: ${item.email} | ID: ${item.id}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

