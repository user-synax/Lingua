const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request(path, { method = "GET", body, headers = {}, credentials = "include" } = {}) {
  const url = `${API_URL}/api${path}`;
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials,
  };
  if (body !== undefined) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || `Request failed: ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) => request(path, { ...opts, method: "PATCH", body }),
  del: (path, opts) => request(path, { ...opts, method: "DELETE" }),
  // auth
  signup: (data) => request("/auth/signup", { method: "POST", body: data }),
  login: (data) => request("/auth/login", { method: "POST", body: data }),
  logout: () => request("/auth/logout", { method: "POST" }),
  me: () => request("/auth/me", { method: "GET" }),
  verify: (data) => request("/auth/verify", { method: "POST", body: data }),
  forgot: (data) => request("/auth/forgot-password", { method: "POST", body: data }),
  reset: (data) => request("/auth/reset-password", { method: "POST", body: data }),
  refresh: () => request("/auth/refresh", { method: "POST" }),
  // user
  getUser: () => request("/user/me", { method: "GET" }),
  updateUser: (data) => request("/user/me", { method: "PATCH", body: data }),
  deleteUser: () => request("/user/me", { method: "DELETE" }),
  // onboarding
  getOnboarding: () => request("/onboarding", { method: "GET" }),
  saveOnboarding: (data) => request("/onboarding", { method: "PUT", body: data }),
  // rooms — LiveKit
  listRooms: () => request("/rooms", { method: "GET" }),
  createRoom: (data) => request("/rooms", { method: "POST", body: data || {} }),
  getRoom: (name) => request(`/rooms/${name}`, { method: "GET" }),
  roomToken: (data) => request("/rooms/token", { method: "POST", body: data }),
};
