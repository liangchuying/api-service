import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Stronger logging so you can confirm the middleware runs
  console.log("[MIDDLEWARE] path=", pathname, "method=", req.method);

  // Allow public paths and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/login" ||
    PUBLIC_FILE.test(pathname)
  ) {
    console.log("[MIDDLEWARE] public path, skip:", pathname);
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  console.log("[MIDDLEWARE] token-present:", Boolean(token));

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    console.log("[MIDDLEWARE] redirect to login from:", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except _next, api and login
  matcher: ["/((?!_next|api|login|favicon.ico).*)"],
};
