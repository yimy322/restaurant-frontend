export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export function authFetch(path, options = {}) {
  const token = localStorage.getItem("admin_token");

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(`${API_BASE_URL}${path}`, { ...options, headers });
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("admin_token"));
}

export function logout() {
  localStorage.removeItem("admin_token");
}