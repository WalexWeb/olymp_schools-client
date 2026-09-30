/**
 * Central axios instance.
 *
 * - Request interceptor: injects Authorization: Bearer <access>.
 * - Response interceptor: on 401 tries a single-use refresh, retries the
 *   original request once. On failure — clears tokens, redirects to /login.
 * - Refresh is guarded by an in-flight promise: N concurrent 401s -> 1 refresh.
 */

import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../stores/authStore";

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    const headers = config.headers ?? new AxiosHeaders();
    headers.set("Authorization", `Bearer ${token}`);
    config.headers = headers;
  }

  // If data is FormData, let the browser/axios set Content-Type with boundary.
  // Our default `application/json` would break multipart uploads.
  if (config.data instanceof FormData && config.headers) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.delete("Content-Type");
    } else {
      delete (config.headers as Record<string, unknown>)["Content-Type"];
    }
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

async function refreshAccessToken(): Promise<string> {
  const refresh = useAuthStore.getState().refreshToken;
  if (!refresh) throw new Error("no refresh token");

  const { data } = await axios.post(
    `${BASE_URL}/auth/refresh`,
    { refreshToken: refresh },
    { headers: { "Content-Type": "application/json" } },
  );

  useAuthStore.getState().setTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });
  return data.accessToken;
}

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;
    if (!original || error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }
    if (original.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }
      const newAccess = await refreshPromise;
      const headers = original.headers ?? new AxiosHeaders();
      if (headers instanceof AxiosHeaders) {
        headers.set("Authorization", `Bearer ${newAccess}`);
      } else {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${newAccess}`;
      }
      original.headers = headers;
      return api(original);
    } catch (refreshError) {
      useAuthStore.getState().clearTokens();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    }
  },
);
