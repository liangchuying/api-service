"use client";

import { Card, Col, Row, Statistic, Table, Tag, Typography } from "antd";
import {
  RocketOutlined,
  ApiOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { AdminLayout } from "@/components/layout";

const { Title, Paragraph } = Typography;

const columns = [
  {
    title: "任务",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const color = status === "已完成" ? "green" : status === "进行中" ? "blue" : "orange";
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "负责人",
    dataIndex: "owner",
    key: "owner",
  },
  {
    title: "更新时间",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
];

const dataSource = [
  {
    key: "1",
    name: "接入后端 API",
    status: "进行中",
    owner: "Alice",
    updatedAt: "2025-12-01 12:30",
  },
  {
    key: "2",
    name: "用户权限配置",
    status: "待处理",
    owner: "Bob",
    updatedAt: "2025-11-30 18:20",
  },
  {
    key: "3",
    name: "数据看板搭建",
    status: "已完成",
    owner: "Carol",
    updatedAt: "2025-11-28 09:10",
  },
];

export default function Home() {
  return (
    <AdminLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <Title level={2} style={{ marginBottom: 8 }}>
            后台管理面板
          </Title>
          <Paragraph type="secondary" style={{ margin: 0 }}>
            左侧为导航菜单，右侧展示业务内容，可在此扩展表格、表单、统计卡片等模块。
          </Paragraph>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="今日请求数"
                value={12680}
                prefix={<RocketOutlined />}
                valueStyle={{ color: "#1677ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="成功率"
                value={99.2}
                suffix="%"
                prefix={<SafetyOutlined />}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="平均响应(ms)"
                value={183}
                prefix={<ThunderboltOutlined />}
                valueStyle={{ color: "#faad14" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="活跃接口"
                value={48}
                prefix={<ApiOutlined />}
                valueStyle={{ color: "#eb2f96" }}
              />
            </Card>
          </Col>
        </Row>

        <Card title="近期任务" bodyStyle={{ padding: 0 }}>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ x: true }}
          />
        </Card>
      </div>
    </AdminLayout>
  );
}

