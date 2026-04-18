// TODO(FSD): shared 레이어가 entities/auth를 import하는 역참조. 별도 PR에서 의존성 역전으로 분리.
import { refreshTokenGuard, useAuthStore } from "@entities/auth";
import { SECOND } from "@shared/constants";

import type { AxiosError } from "axios";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "",
  timeout: 10 * SECOND,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(config => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest.url === "/api/v1/auth/refresh" ||
      originalRequest.url === "/api/v1/auth/login"
    ) {
      return Promise.reject(error);
    }

    const { refreshToken } = useAuthStore.getState();

    if (!refreshToken) {
      return Promise.reject(error);
    }

    try {
      const data = await refreshTokenGuard(refreshToken);

      useAuthStore.getState().setTokens(data.access_token, data.refresh_token, data.expires_in);

      originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

      return api(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clearTokens();

      return Promise.reject(refreshError);
    }
  },
);
