import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const islogin = request.cookies.get("islogin");
  if (!islogin) {
    if (
      request.nextUrl.pathname.startsWith("/appList") ||
      request.nextUrl.pathname.startsWith("/home") ||
      request.nextUrl.pathname.startsWith("/category") ||
      request.nextUrl.pathname.startsWith("/recipes") ||
      request.nextUrl.pathname.startsWith("/banner") ||
      request.nextUrl.pathname.startsWith("/user")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

