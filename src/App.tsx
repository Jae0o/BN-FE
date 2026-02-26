import { RouterProvider } from "react-router-dom";

import { router } from "@app/router";
import { queryClient } from "@lib/apis";
import { useTokenRefresh } from "@lib/hooks";
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
