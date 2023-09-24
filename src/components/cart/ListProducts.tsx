'use client'
import React, { useContext, useMemo } from "react";
import Image from "next/image";
import PlusIcon from "@/icons/PlusIcon";
import Link from "next/link";
import MinusIcon from "@/icons/MinusIcon";
import useMobile from "@/hooks/isMobile";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/axios";
import { CartContext } from "@/providers/cartProvider";

const ListProducts = () => {
  const { data } = useQuery(["getProducts"], getProducts)
  const { state } = useContext(CartContext);

  const products = useMemo(() => {
    return state.products.map((product) => {
      const temp = data?.data.find((p) => p._id === product.id);
      return { ...temp, quantity: product.quantity }
    })
  }, [state.products, data?.data])

  if (!data && !products) return <div>error</div> 

  if (products.length === 0) return <div>nothing to show</div>

  return (
    <div>
      <ul className="p-4 flex flex-col gap-4">
        {products.map((product) => (
          <li key={product?._id} className="shadow-md p-2 rounded">
            <Child id={product._id} name={product.name} image={product.img} quantity={product.quantity} price={product.price} />
          </li>
        ))}
        <li className="flex justify-end gap-4 items-center">
          <h2 className="font-semibold text-lg">Total: $8991</h2>
          <Link href="/checkout">
            <button className="bg-blue-500 px-4 py-1 rounded text-white active:scale-95">checkout now</button>
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
  const { state, dispatch } = useContext(CartContext)
  
  const handleIncreaseQuantity = () => {
    if (id) dispatch({ action: "INCREASE_QUANTITY", payload: { id } })
    window.localStorage.setItem('cart', JSON.stringify(state.products))
  }

  const handleDecreaseQuantity = () => {
    if (id) {
      if (state.products.find((p) => p.id === id)?.quantity === 1) {
        dispatch({ action: 'REMOVE_FROM_CART', payload: { id } })
        window.localStorage.setItem('cart', JSON.stringify(state.products))
        return
      }

      dispatch({ action: "DECREASE_QUANTITY", payload: { id } })
      window.localStorage.setItem('cart', JSON.stringify(state.products))
    }
  }

  return (
    <div className="flex gap-4">
      <div className="min-w-[220px]">
        {image && <Image src={image} alt="laptop" height={160} width={220} />}
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm">{isMobile ? name && name.slice(0, 130) + " ...": name}</h3>
        <p className="text-[12px] md:mt-1">product quantity: {quantity}</p>
        <h3 className="text-[12px] flex-1 md:mt-1">Price: ${price}</h3>
        <div className="flex justify-between items-center mt-2 md:mt-0">
          <div>
            <button onClick={handleIncreaseQuantity} className="border border-blue-500 rounded px-4 md:px-8 active:scale-95">
              <PlusIcon w={14} h={14} />
            </button>
            <button onClick={handleDecreaseQuantity} className="border border-blue-500 rounded px-4 md:px-8 ml-2 active:scale-95">
              <MinusIcon w={14} h={14} />
            </button>
          </div>
          <div>
            <h3 className="text-md font-semibold">cost: ${price && quantity && price * quantity}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProducts;
