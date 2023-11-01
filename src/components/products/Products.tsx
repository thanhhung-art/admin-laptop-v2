"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getProducts, getProductsInfinity } from "@/lib/axios";
import { Suspense } from "react";
import { IProduct } from "@/types/product";

const Products = () => {
  const { data, isLoading } = useInfiniteQuery(
    ["getProducts"],
    ({ pageParam = 0 }) => getProductsInfinity(pageParam)
  );

  if (isLoading) return <div>loading</div>;

  if (!data) return <div>error</div>;

  return (
    <ul className="max-w-7xl m-auto grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 justify-between mt-4">
      {data.pages
        .reduce((acc, curr) => {
          return acc.concat(curr.data.products);
        }, [] as IProduct[])
        .map((product) => (
          <li key={product._id}>
            <Card product={product} />
          </li>
        ))}
    </ul>
  );
};

export default Products;
