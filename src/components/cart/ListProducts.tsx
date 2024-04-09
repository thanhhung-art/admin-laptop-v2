"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useGetProductsInCart } from "@/hooks/getProductsInCart";
import ChildItem from "./ChildItems";

const ListProducts = () => {
  const { products } = useGetProductsInCart();

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
        {products.map((product) => (
          <li
            key={product._id + product.color}
            className="shadow-md p-2 rounded"
          >
            <ChildItem
              id={product._id}
              name={product.name}
              image={product.img}
              quantity={product.quantity}
              price={product.price}
              color={product.color}
            />
          </li>
        ))}
        <li className="flex justify-end gap-4 items-center mt-auto">
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

export default ListProducts;
