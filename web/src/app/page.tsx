"use client";

import { Layout, Card, Row, Col, Button, Space, Typography, Divider } from "antd";
import {
  RocketOutlined,
  ApiOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Header from "@/components/layout/Header";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ padding: "48px 24px", background: "#f0f2f5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Title level={1} style={{ marginBottom: 16 }}>
              欢迎使用 API Service
            </Title>
            <Paragraph style={{ fontSize: 16, color: "#666" }}>
              基于 Next.js + TypeScript + Ant Design 构建的现代化 Web 应用
            </Paragraph>
          </div>

          <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{ textAlign: "center", height: "100%" }}
                cover={
                  <div style={{ padding: "32px 16px", fontSize: 48 }}>
                    <RocketOutlined style={{ color: "#1677ff" }} />
                  </div>
                }
              >
                <Card.Meta
                  title="高性能"
                  description="基于 Next.js 的 SSR 和静态生成，提供极致的性能体验"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{ textAlign: "center", height: "100%" }}
                cover={
                  <div style={{ padding: "32px 16px", fontSize: 48 }}>
                    <ApiOutlined style={{ color: "#52c41a" }} />
                  </div>
                }
              >
                <Card.Meta
                  title="类型安全"
                  description="使用 TypeScript 确保代码质量和开发体验"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{ textAlign: "center", height: "100%" }}
                cover={
                  <div style={{ padding: "32px 16px", fontSize: 48 }}>
                    <SafetyOutlined style={{ color: "#faad14" }} />
                  </div>
                }
              >
                <Card.Meta
                  title="企业级 UI"
                  description="使用 Ant Design 组件库，提供专业的企业级界面"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{ textAlign: "center", height: "100%" }}
                cover={
                  <div style={{ padding: "32px 16px", fontSize: 48 }}>
                    <ThunderboltOutlined style={{ color: "#eb2f96" }} />
                  </div>
                }
              >
                <Card.Meta
                  title="开箱即用"
                  description="完整的目录结构和工具函数，快速开始开发"
                />
              </Card>
            </Col>
          </Row>

          <Card>
            <Title level={2}>快速开始</Title>
            <Paragraph>
              项目已经配置好了基础结构，包括：
            </Paragraph>
            <ul style={{ marginBottom: 24 }}>
              <li>
                <strong>components/</strong> - 组件目录（common、layout、forms）
              </li>
              <li>
                <strong>hooks/</strong> - 自定义 Hooks
              </li>
              <li>
                <strong>utils/</strong> - 工具函数
              </li>
              <li>
                <strong>services/</strong> - API 服务封装
              </li>
              <li>
                <strong>types/</strong> - TypeScript 类型定义
              </li>
              <li>
                <strong>constants/</strong> - 常量配置
              </li>
              <li>
                <strong>lib/</strong> - 第三方库配置
              </li>
            </ul>
            <Divider />
            <Space size="large">
              <Button type="primary" size="large" icon={<RocketOutlined />}>
                开始开发
              </Button>
              <Button size="large">查看文档</Button>
            </Space>
          </Card>
        </div>
      </Content>
    </Layout>
  );
}
