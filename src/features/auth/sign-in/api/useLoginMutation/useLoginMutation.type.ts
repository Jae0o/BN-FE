import type { UR3Token } from "@entities/auth";

export interface UseLoginRequest {
  email: string;
  password: string;
}

export type UseLoginResponse = UR3Token;
