"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC } from "react";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
  const client = new QueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
