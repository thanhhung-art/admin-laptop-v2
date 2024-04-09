"use client";

import useMobile from "@/hooks/isMobile";
import Image from "next/image";
import MinusIcon from "@/icons/MinusIcon";
import PlusIcon from "@/icons/PlusIcon";
import { useStore } from "@/providers/cartStore";
import XMarkIcon from "@/icons/XMarkIcon";

interface IChildProps {
  id?: string;
  name?: string;
  image?: string;
  quantity?: number;
  price?: number;
  color?: string;
}

function ChildItem({ id, name, image, quantity, price, color }: IChildProps) {
  const { isMobile } = useMobile();
  const { increaseQuantity, decreaseQuantity, removeProduct } = useStore();

  const handleIncreaseQuantity = () => {
    if (id && color) increaseQuantity(id, color);
  };

  const handleDecreaseQuantity = () => {
    if (id && color) {
      decreaseQuantity(id, color);
    }
  };

  const handleRemoveProduct = () => {
    if (id && color) {
      removeProduct(id, color);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="w-[120px] h-[70px] relative">
        {image && (
          <Image
            src={image}
            alt="laptop"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        )}
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-[12px] max-w-[240px] md:max-w-none md:text-[14px]">
          {isMobile ? name && name.slice(0, 130) + " ..." : name}
        </h3>
        <h3 className="text-[12px] font-semibold">${price}</h3>
        <h3 className="text-[12px] flex-1 mb-1">{color}</h3>
        <div className="flex justify-between items-center mt-2 md:mt-0">
          <div className="flex flex-1">
            <button
              title="increase quantity"
              onClick={handleIncreaseQuantity}
              className="border border-blue-500 rounded px-2 md:px-4 active:scale-95"
            >
              <PlusIcon w={14} h={14} />
            </button>
            <div className="px-2">
              <p className="text-sm">{quantity}</p>
            </div>
            <button
              title="decrease quantity"
              onClick={handleDecreaseQuantity}
              className="border border-blue-500 rounded px-2 md:px-4 active:scale-95"
            >
              <MinusIcon w={14} h={14} />
            </button>
            <button
              title="remove product"
              className="border border-blue-500 rounded px-2 md:px-4 active:scale-95 ml-2"
              onClick={handleRemoveProduct}
            >
              <XMarkIcon w={14} h={14} />
            </button>
          </div>
          <div>
            <h3 className="text-sm md:text-base ml-auto font-semibold">
              ${price && quantity && Number((price * quantity).toFixed(2))}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChildItem;
