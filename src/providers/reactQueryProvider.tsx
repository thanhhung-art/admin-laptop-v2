'use client'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

const queryClient = new QueryClient(queryClientOptions)

const ReactQueryProvider = ({ children }: Props) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
