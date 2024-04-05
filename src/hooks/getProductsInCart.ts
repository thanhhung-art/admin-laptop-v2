"use client";
import { getProduct } from "@/lib/axios";
import { useStore } from "@/providers/cartStore";
import { IProduct, IProductInCheckout } from "@/types/product";
import { GetProduct } from "@/utils/keys";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

export function useGetProductsInCart() {
  const { products } = useStore();

  const data = useQueries({
    queries: products.map((product) => ({
      queryKey: [GetProduct, product.productId],
      queryFn: () => {
        return getProduct(product.productId);
      },
    })),
  }).map((data) => {
    return data.data?.data;
  });

  const memoProducts: IProductInCheckout[] = useMemo(() => {
    const temp: IProductInCheckout[] = products.map((product) => {
      const productFound = data.find((p) => p?._id === product.productId);
      return {
        ...(productFound || ({ _id: product.productId } as IProduct)),
        color: product.color,
        quantity: product.quantity,
      };
    });

    return temp;
  }, [data, products]);

  return { products: memoProducts };
}
