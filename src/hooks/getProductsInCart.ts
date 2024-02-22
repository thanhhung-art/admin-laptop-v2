"use client";
import { getProduct } from "@/lib/axios";
import { CartContext } from "@/providers/cartProvider";
import { IProduct, IProductInCheckout } from "@/types/product";
import { GetProduct } from "@/utils/keys";
import { useQueries } from "@tanstack/react-query";
import { useContext, useMemo } from "react";

export function useGetProductsInCart() {
  const { state } = useContext(CartContext);

  const data = useQueries({
    queries: state.products.map((product) => ({
      queryKey: [GetProduct, product.productId],
      queryFn: () => getProduct(product.productId),
    })),
  }).map((data) => data.data?.data);

  const memoProducts: IProductInCheckout[] = useMemo(() => {
    const temp: IProductInCheckout[] = state.products.map((product) => {
      const productFound = data.find((p) => p?._id === product.productId);
      return {
        ...(productFound || ({ _id: product.productId } as IProduct)),
        quantity: product.quantity ? product.quantity : 1,
      };
    });

    return temp;
  }, [data, state.products]);

  return { products: memoProducts };
}
