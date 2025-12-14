import { AdminLayout } from "@/components/layout";

/**
 * 管理后台路由组布局
 * 使用 AdminLayout，包含左侧导航和顶部 Header
 */
export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}

