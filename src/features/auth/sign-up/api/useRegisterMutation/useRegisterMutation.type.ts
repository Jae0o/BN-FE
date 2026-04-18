import type { UR3Token } from "@entities/auth";

export interface UseRegisterRequest {
  email: string;
  password: string;
}

export type UseRegisterResponse = UR3Token;
