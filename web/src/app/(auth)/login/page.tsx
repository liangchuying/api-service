"use client";

import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { post } from "@/services/api";
import { STORAGE_KEYS } from "@/constants";

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

/**
 * 登录页面
 */
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await post<{ accessToken: string }>("/auth/login", {
        email: values.email,
        password: values.password,
      });

      if (response.data?.accessToken) {
        // 保存 token
        localStorage.setItem(STORAGE_KEYS.token, response.data.accessToken);
        message.success("登录成功");
        // 跳转到首页
        router.push("/");
      }
    } catch (error: any) {
      message.error(error.message || "登录失败，请检查账号密码");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 8 }}>
          API Service
        </Title>
        <Typography.Text type="secondary">欢迎登录</Typography.Text>
      </div>

      <Form
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        size="large"
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "请输入有效的邮箱地址" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="邮箱"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "请输入密码" },
            { min: 6, message: "密码长度至少6位" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="密码"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

