import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import { useStore } from "@/providers/cartStore";
import { useState } from "react";

interface IProps {
  product: IProduct;
  letterQuantity: number;
  imageWidth?: {
    sm?: string;
    md?: string;
    lg?: string;
  };
  imageHeight?: {
    sm?: string;
    md?: string;
    lg?: string;
  };
  type?: "small" | "normal";
  fontSize?: {
    sm?: string;
    md?: string;
    lg?: string;
  };
  starsCenter?: boolean;
  flexBasis?: {
    sm?: string;
    md?: string;
    lg?: string;
  };
  colorsCenter?: boolean;
}
const Card = ({
  product,
  letterQuantity,
  imageHeight = { sm: "min-h-[130px]", md: "min-h-[200px]" },
  type = "normal",
  fontSize,
  starsCenter,
  colorsCenter,
  flexBasis = { sm: "basis-full", md: "basis-none" },
}: IProps) => {
  const { products, addProduct, increaseQuantity } = useStore();
  const [buttonText, setButtonText] = useState<string>("add to cart");
  const [currColor, setCurrColor] = useState(product.colors[0].color);

  const handleAddToCart = () => {
    setButtonText("success!");

    setTimeout(() => {
      setButtonText("add to cart");
    }, 1000);

    if (
      products.find((p) => p.productId === product._id && p.color === currColor)
    ) {
      increaseQuantity(product._id, currColor);
      return;
    }

    addProduct(product._id, currColor);
  };

  const handleSetCurrColor = (color: string) => {
    setCurrColor(color);
  };

  return (
    <div
      className={`max-w-2xl mx-auto ${flexBasis.sm} md:basis-none md:w-[308px] shrink-0 grow-0`}
    >
      <div className="bg-white shadow-md rounded-lg dark:border-gray-700 p-5">
        <Link href={`/product/${product._id}`}>
          <div
            className={`relative ${imageHeight.sm} md:${imageHeight.md} max-w-[300px] m-auto`}
          >
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
              className={`font-semibold ${fontSize?.sm || "text-base"} md:${
                fontSize?.md
              } md:text-base tracking-tight min-h-[143.95px]`}
              title={product.name}
            >
              {product.name.slice(0, letterQuantity)}
            </h3>
          </Link>
          <div
            className={`flex items-center mt-2.5 mb-2 md:justify-start ${
              starsCenter && "justify-center"
            }`}
          >
            <Rating value={product.rating} readonly />
          </div>
          <div
            className={`flex flex-wrap gap-2 md:justify-start ${
              colorsCenter && "justify-center"
            }`}
          >
            {product.colors.map(({ color }) => (
              <span
                key={color}
                className={`${
                  color === currColor
                    ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                    : "bg-slate-400 hover:bg-slate-500 active:bg-slate-600"
                } px-2 py-1 rounded text-white cursor-pointer text-[12px]`}
                onClick={() => handleSetCurrColor(color)}
              >
                {color}
              </span>
            ))}
          </div>
          <div
            className={`flex items-center justify-between md:flex-row ${
              type === "small" && "flex-col"
            }`}
          >
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
