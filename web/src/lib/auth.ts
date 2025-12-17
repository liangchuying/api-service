/**
 * 从请求对象中提取 token。
 * 适用于 Next.js `NextRequest`（middleware）或普通的服务器请求对象（包含 cookies 字段）。
 *
 * 示例（middleware 中使用）：
 * ```ts
 * import { NextResponse } from 'next/server';
 * import type { NextRequest } from 'next/server';
 * import { getTokenFromReq, isAuthenticatedToken } from '@/lib/auth';
 *
 * export function middleware(req: NextRequest) {
 *   const token = getTokenFromReq(req);
 *   if (!isAuthenticatedToken(token)) {
 *     const loginUrl = new URL('/login', req.url);
 *     loginUrl.searchParams.set('from', req.nextUrl.pathname);
 *     return NextResponse.redirect(loginUrl);
 *   }
 *   return NextResponse.next();
 * }
 * ```
 */
export function getTokenFromReq(req: any): string | null {
  // Works with NextRequest (middleware) and Node/Server handlers which expose cookies
  return req?.cookies?.get?.("token")?.value ?? req?.cookies?.token ?? null;
}

/** 简单判断 token 是否存在（可扩展为 JWT 验签或后端验证） */
export function isAuthenticatedToken(token?: string | null) {
  return Boolean(token && token.length > 0);
}
