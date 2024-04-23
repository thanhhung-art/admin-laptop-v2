import Image from "next/image";
import { IProduct } from "@/types/product";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";
import { useStore } from "@/providers/cartStore";
import Rating from "../Rating";

interface IProps {
  product: IProduct;
  width?: { sm?: string; md?: string };
  isMobile?: boolean;
}

const Card = ({ product, width, isMobile }: IProps) => {
  const { products, addProduct, increaseQuantity } = useStore();
  const [buttonText, setButtonText] = useState<string>("add to cart");
  const currColor = useRef(product.colors[0].color);

  const handleAddToCart = () => {
    setButtonText("success!");

    setTimeout(() => {
      setButtonText("add to cart");
    }, 1000);

    if (
      products.find(
        (p) => p.productId === product._id && p.color === currColor.current
      )
    ) {
      increaseQuantity(product._id, currColor.current);
      return;
    }

    addProduct(product._id, currColor.current);
  };

  const handleChangeCurrColor = (e: ChangeEvent<HTMLSelectElement>) => {
    currColor.current = e.target.value;
  };
  return (
    <div
      className={`bg-white rounded p-2 ${width?.sm} shrink-0 ${width?.md} md:rounded-lg md:p-4`}
    >
      <div className="relative h-[120px] my-4">
        <Link href={`/product/${product._id}`}>
          <Image
            className="rounded-t-lg"
            src={product.img}
            alt="product image"
            fill
            sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
            style={{ objectFit: "contain" }}
          />
        </Link>
      </div>

      <div className="min-h-[120px] md:min-h-[170px]">
        <h3 className="text-[13px] md:text-base font-semibold">
          {product.name.slice(0, isMobile ? 100 : 200)}
        </h3>
      </div>

      <div className="mt-2">
        <Rating value={product.rating} readonly />
      </div>

      <div className="flex gap-1 my-2">
        <select
          name="select-color"
          title="select-color"
          id=""
          className="px-2 text-sm"
          onChange={handleChangeCurrColor}
        >
          {product.colors.map(({ color }) => (
            <option key={color} value={color} className="text-sm">
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="font-semibold">${product.price}</h2>
        <button
          className="bg-blue-500 text-white rounded text-[10px] py-1 px-2 md:text-base md:px-3 md:py-1 md:rounded-lg hover:bg-blue-600 active:bg-blue-700"
          onClick={handleAddToCart}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
