import { NextRequest, NextResponse } from "next/server";

import { PUBLIC_PATHS } from "./lib/routing/constants";

export async function middleware(request: NextRequest) {
  const locales = ["en", "fr"];
  const defaultLocale = locales[0];

  const { pathname } = request.nextUrl;

  const pathnameIsPublicPath: boolean = PUBLIC_PATHS.reduce(
    (pathnameIsPublicPath, publicPath) => {
      if (pathname.startsWith(publicPath)) {
        pathnameIsPublicPath = true;
      }

      return pathnameIsPublicPath;
    },
    false,
  );

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale && !pathnameIsPublicPath) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
