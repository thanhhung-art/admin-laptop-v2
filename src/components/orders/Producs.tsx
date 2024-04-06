import UseGetProductsInOrder from "@/hooks/getProductsInOrder";
import { IProductInCart } from "@/types/product";
import Image from "next/image";

interface Iprops {
  products: IProductInCart[];
}

const Products = ({ products }: Iprops) => {
  const { data } = UseGetProductsInOrder(products);

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
              <h6 className="my-1 font-semibold">${product.price}</h6>
              <h6 className="text-sm">Quantity: x{product.quantity}</h6>
              <h6 className="text-sm">{product.color}</h6>
            </div>
          </div>
        </div>
      ))}
      <div></div>
    </section>
  );
};

export default Products;
