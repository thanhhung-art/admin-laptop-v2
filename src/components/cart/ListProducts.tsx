"use client";
import React, { useContext, useMemo } from "react";
import Image from "next/image";
import PlusIcon from "@/icons/PlusIcon";
import Link from "next/link";
import MinusIcon from "@/icons/MinusIcon";
import useMobile from "@/hooks/isMobile";
import { ACTIONS, CartContext } from "@/providers/cartProvider";
import { useGetProductsInCart } from "@/hooks/getProductsInCart";

const ListProducts = () => {
  const { products, isLoading } = useGetProductsInCart()

  const totalAmount = useMemo(() => {
    return products.reduce((acc, product) => {
      if (product.quantity && product.price)
        return Number((acc + product.quantity * product.price).toFixed(2));
      return Number(acc.toFixed(2));
    }, 0);
  }, [products]);

  if (!products) return <div>error</div>;

  if (products.length === 0) return <div>nothing to show</div>;

  return (
    <div>
      <ul className="p-4 flex flex-col gap-4">
        {products.map((product, i) => (
          <li key={product?._id || i} className="shadow-md p-2 rounded">
            <Child
              id={product._id}
              name={product.name}
              image={product.img}
              quantity={product.quantity}
              price={product.price}
            />
          </li>
        ))}
        <li className="flex justify-end gap-4 items-center">
          <h2 className="font-semibold text-lg">Total: ${totalAmount}</h2>
          <Link href="/checkout">
            <button className="bg-blue-500 px-4 py-1 rounded text-white active:scale-95">
              checkout now
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

interface IChildProps {
  id: string | undefined;
  name: string | undefined;
  image: string | undefined;
  quantity: number | undefined;
  price: number | undefined;
}

function Child({ id, name, image, quantity, price }: IChildProps) {
  const { isMobile } = useMobile();
  const { state, dispatch } = useContext(CartContext);

  const handleIncreaseQuantity = () => {
    if (id) dispatch({ action: ACTIONS.INCREASE_QUANTITY, payload: { productId: id } });
  };

  const handleDecreaseQuantity = () => {
    if (id) {
      if (state.products.find((p) => p.productId === id)?.quantity === 1) {
        dispatch({ action: ACTIONS.REMOVE_FROM_CART, payload: { productId: id } });
        return;
      }

      dispatch({ action: ACTIONS.DECREASE_QUANTITY, payload: { productId: id } });
    }
  };

  return (
    <div className="flex gap-4">
      <div className="min-w-[220px]">
        {image && <Image src={image} alt="laptop" height={160} width={220} />}
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

export default ListProducts;
