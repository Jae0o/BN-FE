import type { UR3Token } from "@lib/types";

export interface UseRegisterRequest {
  email: string;
  password: string;
}

export type UseRegisterResponse = UR3Token;
