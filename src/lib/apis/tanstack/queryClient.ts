import { MINUTE } from "@/lib/constants";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * MINUTE,
      gcTime: 10 * MINUTE,
      retry: 1,
      refetchOnWindowFocus: false,
    },

    mutations: {
      retry: 1,
    },
  },
});
