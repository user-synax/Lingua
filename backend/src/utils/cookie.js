import { env } from "../config/env.js";

const isProd = env.nodeEnv === "production";

function baseCookieOpts(maxAgeMs) {
  return {
    httpOnly: true,
    secure: env.cookieSecure || isProd, // false locally, true in prod
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeMs,
  };
}

// 15m and 7d in ms
export function setAuthCookies(res, accessToken, refreshToken) {
  const accessMaxAge = 15 * 60 * 1000;
  const refreshMaxAge = 7 * 24 * 60 * 60 * 1000;
  res.cookie("accessToken", accessToken, baseCookieOpts(accessMaxAge));
  res.cookie("refreshToken", refreshToken, baseCookieOpts(refreshMaxAge));
}

export function clearAuthCookies(res) {
  const opts = { httpOnly: true, secure: env.cookieSecure || isProd, sameSite: "lax", path: "/" };
  res.clearCookie("accessToken", opts);
  res.clearCookie("refreshToken", opts);
}
