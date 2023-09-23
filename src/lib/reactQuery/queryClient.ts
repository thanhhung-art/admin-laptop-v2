import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

export const queryClient = cache(() => new QueryClient(queryClientOptions))
