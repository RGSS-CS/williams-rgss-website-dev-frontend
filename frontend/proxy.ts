import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";
const USER_GROUPS_COOKIE = "user_groups";
const ACCOUNT_USERNAME_COOKIE = "account_username";
const REFRESH_BEFORE_EXPIRY_MS = 60_000;

type RefreshResponse = {
  access?: string;
  refresh?: string;
};

function getApiBaseUrl(): string {
  return process.env.API_URL || "http://backend:8000";
}

function isAccessTokenNearExpiry(token: string | undefined): boolean {
  if (!token) {
    return true;
  }

  try {
    const payload = token.split(".")[1];
    if (!payload) {
      return true;
    }

    const base64Payload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = base64Payload.padEnd(Math.ceil(base64Payload.length / 4) * 4, "=");
    const { exp } = JSON.parse(atob(paddedPayload)) as { exp?: unknown };

    return typeof exp !== "number" || exp * 1000 <= Date.now() + REFRESH_BEFORE_EXPIRY_MS;
  } catch {
    return true;
  }
}

function updateRequestCookie(headers: Headers, name: string, value: string): void {
  const cookieValues = new Map<string, string>();
  for (const cookie of headers.get("cookie")?.split(";") ?? []) {
    const separator = cookie.indexOf("=");
    if (separator > 0) {
      cookieValues.set(cookie.slice(0, separator).trim(), cookie.slice(separator + 1).trim());
    }
  }

  cookieValues.set(name, value);
  headers.set(
    "cookie",
    Array.from(cookieValues, ([cookieName, cookieValue]) => `${cookieName}=${cookieValue}`).join(
      "; "
    )
  );
}

function deleteRequestCookie(headers: Headers, name: string): void {
  const cookieValues = new Map<string, string>();
  for (const cookie of headers.get("cookie")?.split(";") ?? []) {
    const separator = cookie.indexOf("=");
    if (separator > 0) {
      const cookieName = cookie.slice(0, separator).trim();
      if (cookieName !== name) {
        cookieValues.set(cookieName, cookie.slice(separator + 1).trim());
      }
    }
  }

  if (cookieValues.size === 0) {
    headers.delete("cookie");
    return;
  }

  headers.set(
    "cookie",
    Array.from(cookieValues, ([cookieName, cookieValue]) => `${cookieName}=${cookieValue}`).join(
      "; "
    )
  );
}

function clearAuthCookies(requestHeaders: Headers): NextResponse {
  deleteRequestCookie(requestHeaders, ACCESS_TOKEN_COOKIE);
  deleteRequestCookie(requestHeaders, REFRESH_TOKEN_COOKIE);
  deleteRequestCookie(requestHeaders, USER_GROUPS_COOKIE);
  deleteRequestCookie(requestHeaders, ACCOUNT_USERNAME_COOKIE);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(REFRESH_TOKEN_COOKIE);
  response.cookies.delete(USER_GROUPS_COOKIE);
  response.cookies.delete(ACCOUNT_USERNAME_COOKIE);
  return response;
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken || !isAccessTokenNearExpiry(accessToken)) {
    return NextResponse.next();
  }

  let refreshResponse: Response;
  try {
    refreshResponse = await fetch(new URL("/api/token/refresh/", getApiBaseUrl()), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
      cache: "no-store",
    });
  } catch {
    // Keep the existing cookies when the API is temporarily unavailable.
    return NextResponse.next();
  }

  if (refreshResponse.status === 401 || refreshResponse.status === 403) {
    const requestHeaders = new Headers(request.headers);
    return clearAuthCookies(requestHeaders);
  }

  if (!refreshResponse.ok) {
    return NextResponse.next();
  }

  let body: RefreshResponse;
  try {
    body = (await refreshResponse.json()) as RefreshResponse;
  } catch {
    return NextResponse.next();
  }

  if (!body.access) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  updateRequestCookie(requestHeaders, ACCESS_TOKEN_COOKIE, body.access);
  if (body.refresh) {
    updateRequestCookie(requestHeaders, REFRESH_TOKEN_COOKIE, body.refresh);
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  const secure = process.env.NODE_ENV === "production";
  response.cookies.set(ACCESS_TOKEN_COOKIE, body.access, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
  });

  if (body.refresh) {
    response.cookies.set(REFRESH_TOKEN_COOKIE, body.refresh, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
