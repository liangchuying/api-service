import { AuthLayout } from "@/components/layout";

/**
 * 认证路由组布局
 * 使用 AuthLayout，适用于登录、注册等页面
 */
export default function AuthLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}

