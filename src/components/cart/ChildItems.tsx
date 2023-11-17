"use client";

import useMobile from "@/hooks/isMobile";
import { ACTIONS, CartContext } from "@/providers/cartProvider";
import Image from "next/image";
import { useContext } from "react";
import MinusIcon from "@/icons/MinusIcon";
import PlusIcon from "@/icons/PlusIcon";

interface IChildProps {
  id: string | undefined;
  name: string | undefined;
  image: string | undefined;
  quantity: number | undefined;
  price: number | undefined;
}

function ChildItem({ id, name, image, quantity, price }: IChildProps) {
  const { isMobile } = useMobile();
  const { state, dispatch } = useContext(CartContext);

  const handleIncreaseQuantity = () => {
    if (id)
      dispatch({
        action: ACTIONS.INCREASE_QUANTITY,
        payload: { productId: id },
      });
  };

  const handleDecreaseQuantity = () => {
    if (id) {
      if (state.products.find((p) => p.productId === id)?.quantity === 1) {
        dispatch({
          action: ACTIONS.REMOVE_FROM_CART,
          payload: { productId: id },
        });
        return;
      }

      dispatch({
        action: ACTIONS.DECREASE_QUANTITY,
        payload: { productId: id },
      });
    }
  };

  return (
    <div className="flex gap-4">
      <div className="min-w-[220px] w-56 h-40 relative">
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
        <h3 className="text-sm">
          {isMobile ? name && name.slice(0, 130) + " ..." : name}
        </h3>
        <h3 className="text-[12px] flex-1 md:mt-1">${price}</h3>
        <div className="flex justify-between items-center mt-2 md:mt-0">
          <div className="flex">
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
          </div>
          <div>
            <h3 className="text-md font-semibold">
              ${price && quantity && Number((price * quantity).toFixed(2))}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChildItem;
