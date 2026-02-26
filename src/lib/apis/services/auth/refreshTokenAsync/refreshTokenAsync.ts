import { api } from "@lib/apis/axios";
import type { UR3Token } from "@lib/types";

const refreshTokenAsync = async (refreshToken: string) => {
  const { data } = await api.post<UR3Token>("/api/v1/auth/refresh", {
    refresh_token: refreshToken,
  });

  return data;
};

export default refreshTokenAsync;
