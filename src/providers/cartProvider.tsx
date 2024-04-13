"use client";
import { useLayoutEffect } from "react";
import { useStore } from "./cartStore";

// provider
export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initStore } = useStore();

  useLayoutEffect(() => {
    initStore();
    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
}
