"use client";

import { Card, Table, Button, Space, Tag, Typography } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

interface RoleData {
  key: string;
  id: string;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
}

const columns: ColumnsType<RoleData> = [
  {
    title: "角色名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "权限",
    dataIndex: "permissions",
    key: "permissions",
    render: (permissions: string[]) => (
      <Space wrap>
        {permissions.map((permission) => (
          <Tag key={permission} color="blue">
            {permission}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: "用户数",
    dataIndex: "usersCount",
    key: "usersCount",
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space>
        <Button
          type="link"
          icon={<EditOutlined />}
          size="small"
        >
          编辑
        </Button>
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          size="small"
        >
          删除
        </Button>
      </Space>
    ),
  },
];

const dataSource: RoleData[] = [
  {
    key: "1",
    id: "1",
    name: "超级管理员",
    description: "拥有所有权限",
    permissions: ["用户管理", "角色管理", "系统设置"],
    usersCount: 2,
  },
  {
    key: "2",
    id: "2",
    name: "普通管理员",
    description: "拥有部分管理权限",
    permissions: ["用户管理", "内容管理"],
    usersCount: 5,
  },
  {
    key: "3",
    id: "3",
    name: "普通用户",
    description: "普通用户权限",
    permissions: ["内容查看"],
    usersCount: 100,
  },
];

/**
 * 角色管理页面
 */
export default function RolePage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>
          角色管理
        </Title>
        <Button type="primary" icon={<PlusOutlined />}>
          新建角色
        </Button>
      </div>
      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  );
}

