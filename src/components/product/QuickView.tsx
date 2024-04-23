"use client";
import Image from "next/image";
import { useMemo, useRef } from "react";
import Rating from "../Rating";
import { useRouter } from "next/navigation";
import { useStore } from "@/providers/cartStore";

interface IProps {
  image: string;
  name: string;
  price: number;
  rating: number;
  _id: string;
  colors: { color: string; quantity: number }[];
  colorParam: string | undefined;
}
const QuickView = ({
  image,
  name,
  price,
  rating = 0,
  _id,
  colors,
  colorParam,
}: IProps) => {
  const { addProduct, products } = useStore();
  const router = useRouter();
  const currColor = useRef(colorParam || "");
  const color = useMemo(() => {
    return colorParam ? colorParam : colors[0].color;
  }, [colorParam, colors]);

  const handleAddToCart = () => {
    addProduct(_id, color);
  };

  const handleSetSearchParams = (value: string) => {
    router.replace(`?color=${value}`);
    currColor.current = value;
  };

  const handleBuyNow = () => {
    if (
      !products.find(
        (product) => product.color === color && product.productId === _id
      )
    ) {
      addProduct(_id, colorParam ? colorParam : colors[0].color);
    }
    router.push("/checkout");
  };

  return (
    <section className="max-w-7xl m-auto my-4 mb-2 md:mb-4 flex flex-col md:flex-row gap-2 md:gap-4">
      <div className="p-4 bg-white rounded-md">
        <div className=" w-full md:w-80 h-52 relative m-auto">
          {image && (
            <Image
              src={image}
              fill
              style={{ objectFit: "contain" }}
              alt="laptop"
              priority
              sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
            />
          )}
        </div>
      </div>
      <div className="bg-white flex-1 flex flex-col gap-2 rounded-md p-4">
        <h2 className="max-w-[700px] text-lg md:max-w-full md:text-2xl">
          {name}
        </h2>

        <div className="flex gap-2 items-center">
          <h3 className="text-[20px]">{rating}</h3>
          <Rating value={rating} readonly />
        </div>

        <div>
          {colors.map(({ color }) => (
            <span
              className={`mr-2 px-2 py-1 rounded text-white text-sm cursor-pointer ${
                colorParam === color ? "bg-blue-700" : "bg-blue-500"
              } hover:bg-blue-600 active:bg-blue-700`}
              key={color}
              onClick={() => handleSetSearchParams(color)}
            >
              {color}
            </span>
          ))}
        </div>

        <h2 className="text-xl flex-1">
          <span className="text-sm">$</span>
          {price}
        </h2>

        <div className="">
          <button
            onClick={handleAddToCart}
            className="block w-full border-2 border-blue-500 rounded-md py-2 transform hover:bg-gray-50 active:scale-95 text-blue-500"
          >
            ADD TO CARD
          </button>
          <button
            onClick={handleBuyNow}
            className="block w-full bg-blue-500 hover:bg-blue-600 mt-2 rounded-md py-2 transform active:scale-95 text-white"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickView;
