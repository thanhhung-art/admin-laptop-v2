"use client";
import { queryClientOptions } from "@/lib/reactQuery/queryClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/lib/devtools";
import React, { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

const ReactQueryProvider = ({ children }: Props) => {
  const [queryClient] = useState(new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
