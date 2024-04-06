import { getProduct } from "@/lib/axios";
import { IProductInCart } from "@/types/product";
import { GetProduct } from "@/utils/keys";
import { useQueries } from "@tanstack/react-query";

const UseGetProductsInOrder = (productsInCart: IProductInCart[]) => {
  const data = useQueries({
    queries: productsInCart.map((p) => ({
      queryKey: [GetProduct, p.productId],
      queryFn: async () => {
        const product = await getProduct(p.productId);
        return { ...product, quantity: p.quantity || 0, color: p.color };
      },
    })),
  }).map((res) => {
    return {
      _id: res.data?.data._id,
      name: res.data?.data.name,
      img: res.data?.data.img,
      price: res.data?.data.price,
      quantity: res.data?.quantity,
      color: res.data?.color,
    };
  });

  return { data };
};

export default UseGetProductsInOrder;
