"use client";
import React, { createRef, useContext, useMemo, useRef } from "react";
import Image from "next/image";
import { CartContext } from "@/providers/cartProvider";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/axios";
import { IProductInCheckout } from "@/types/product";

interface IProps {
  products: IProductInCheckout[],
  totalPrice: number
}

const ListProducts = ({ products, totalPrice }: IProps) => {
  const containerRef = createRef<HTMLDivElement>();

  return (
    <div
      className="shadow p-2 flex flex-col border-t-2 border-t-gray-600 pt-2 md:border-none"
      ref={containerRef}
    >
      <h2>Order Summary</h2>
      <ul className={`overflow-auto max-h-[628px] lg:max-h-full flex-1`}>
        {products.map((p, i) => (
          <li
            className="flex gap-2 shadow rounded px-2 py-4 items-center"
            key={p._id || i}
          >
            <div>{p.img && <Image src={p.img} alt="laptop" width={40} height={28} />}</div>
            <div>
              <h5 className="text-[12px]">{p.name && p.name.slice(0, 40)}...</h5>
              <p className="text-[12px] text-gray-600">${p.price}</p>
            </div>
            <h5 className="ml-auto">x{p.quantity}</h5>
          </li>
        ))}
      </ul>
      <h2 className="text-end text-lg font-semibold">Total: ${totalPrice}</h2>
    </div>
  );
};

export default ListProducts;
