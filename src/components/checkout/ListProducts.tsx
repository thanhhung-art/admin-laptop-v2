"use client";
import React, { createRef, useContext, useMemo, useRef } from "react";
import Image from "next/image";
import { CartContext } from "@/providers/cartProvider";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/axios";

const ListProducts = () => {
  const containerRef = createRef<HTMLDivElement>();
  const { state } = useContext(CartContext);
  const { data } = useQuery(["getProducts"], getProducts);

  const products = useMemo(() => {
    return state.products.map((product) => {
      const temp = data?.data.find((p) => p._id === product.id);
      return { ...temp, quantity: product.quantity };
    });
  }, [data?.data, state.products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      if (product.quantity && product.price)
        return Number((acc + product.quantity * product.price).toFixed(2));
      return Number(acc.toFixed(2));
    }, 0);
  }, [products])

  return (
    <div
      className="shadow p-2 flex flex-col border-t-2 border-t-gray-600 pt-2 md:border-none"
      ref={containerRef}
    >
      <ul className={`overflow-auto max-h-[628px] lg:max-h-full flex-1`}>
        {products.map((p, i) => (
          <li
            className="flex gap-2 shadow rounded px-2 py-4 items-center"
            key={p._id || i}
          >
            <div>{p.img && <Image src={p.img} alt="laptop" width={40} height={28} />}</div>
            <h5 className="text-[12px]">{p.name && p.name.slice(0, 40)}...</h5>
            <h5>x1</h5>
          </li>
        ))}
      </ul>
      <h2 className="text-end text-lg font-semibold">Total: ${totalPrice}</h2>
    </div>
  );
};

export default ListProducts;
