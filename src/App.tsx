import { RouterProvider } from "react-router-dom";

import { router } from "@app/router";
import { useTokenRefresh } from "@features/auth/refresh-token";
import { queryClient } from "@shared/api/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  useTokenRefresh();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
