import type { UR3Token } from "@lib/types";

export interface UseLoginRequest {
  email: string;
  password: string;
}

export type UseLoginResponse = UR3Token;
