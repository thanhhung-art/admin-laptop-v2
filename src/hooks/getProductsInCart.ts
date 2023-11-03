import { getProduct } from "@/lib/axios";
import { CartContext } from "@/providers/cartProvider";
import { IProductInCheckout } from "@/types/product";
import { useContext, useEffect, useRef, useState } from "react";

export function useGetProductsInCart() {
  const { state } = useContext(CartContext);
  const [products, setProducts] = useState<IProductInCheckout[]>([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const promises = state.products.map((product) => {
      return getProduct(product.productId);
    });

    const getProducts = async () => {
      setIsLoading(true)
      const products = (await Promise.all(promises)).map((p) => p.data);
      const temp = [] as IProductInCheckout[]
      products.forEach((p) => {
        const quantity = state.products.find(
          (product) => product.productId === p._id
        )?.quantity;
        const newProduct = { ...p, quantity: quantity ? quantity : 1 };
        temp.push(newProduct)
      });
      setProducts([...temp])
      setIsLoading(false)
    };

    getProducts();
  }, [state.products]);

  return { products, isLoading };
}
