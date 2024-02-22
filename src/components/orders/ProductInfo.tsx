import { getProduct } from "@/lib/axios";
import { IProductInCart } from "@/types/product";
import { GetProduct } from "@/utils/keys";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";

interface Iprops {
  products: IProductInCart[];
}

const ProductInfo = ({ products }: Iprops) => {
  const data = useQueries({
    queries: products.map((p) => ({
      queryKey: [GetProduct, p.productId],
      queryFn: async () => {
        const product = await getProduct(p.productId);
        return { ...product, quantity: p.quantity || 0 };
      },
    })),
  }).map((res) => ({
    _id: res.data?.data._id,
    name: res.data?.data.name,
    img: res.data?.data.img,
    price: res.data?.data.price,
    quantity: res.data?.quantity,
  }));

  if (!data.some((product) => !!product)) {
    return <div>loading</div>;
  }

  return (
    <section>
      {data.map((product, i) => (
        <div key={product._id || i}>
          <div className="flex gap-4 p-8">
            <div className="p-4 rounded bg-gray-100">
              <div className="h-24 w-24 relative p-8">
                {product.img && (
                  <Image
                    src={product.img}
                    fill
                    style={{ objectFit: "contain" }}
                    alt="laptop"
                    priority
                  />
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <h6 className="my-1">${product.price}</h6>
              <h6 className="text-sm">Quantity: x{product.quantity}</h6>
            </div>
          </div>
        </div>
      ))}
      <div></div>
    </section>
  );
};

export default ProductInfo;
