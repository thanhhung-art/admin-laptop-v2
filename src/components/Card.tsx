import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import { useStore } from "@/providers/cartStore";
import { useState } from "react";

interface IProps {
  product: IProduct;
  letterQuantity: number;
}
const Card = ({ product, letterQuantity }: IProps) => {
  const { products, addProduct, increaseQuantity } = useStore();
  const [buttonText, setButtonText] = useState<string>("add to cart");

  const handleAddToCart = () => {
    setButtonText("success!");

    setTimeout(() => {
      setButtonText("add to cart");
    }, 1000);

    if (
      products.find(
        (p) =>
          p.productId === product._id && p.color === product.colors[0].color
      )
    ) {
      increaseQuantity(product._id, product.colors[0].color);
      return;
    }

    addProduct(product._id, product.colors[0].color);
  };

  return (
    <div className={`max-w-2xl mx-auto md:w-[308px] basis-full shrink-0 grow-0`}>
      <div className="bg-white shadow-md rounded-lg  dark:border-gray-700 p-5">
        <Link href={`/product/${product._id}`}>
          <div className={`relative h-[200px] max-w-[300px] m-auto`}>
            <Image
              className="rounded-t-lg pb-5"
              src={product.img}
              alt="product image"
              fill
              sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
            />
          </div>
        </Link>
        <div className="">
          <Link href={`/product/${product._id}`}>
            <h3
              className="font-semibold text-md tracking-tight min-h-[143.95px]"
              title={product.name}
            >
              {product.name.slice(0, letterQuantity)}
            </h3>
          </Link>
          <div className="flex items-center mt-2.5 mb-5">
            <Rating value={product.rating} readonly />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 outline-none"
              onClick={handleAddToCart}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
