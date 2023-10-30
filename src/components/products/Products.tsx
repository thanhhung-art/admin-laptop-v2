"use client";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getProducts } from "@/lib/axios";
import { Suspense } from "react";

const Products = () => {
  const { data, isLoading } = useQuery(["getProducts"], getProducts, { staleTime: 1000 * 60 * 5 });

  if (isLoading) return <div>loading</div>;

  if (!data) return <div>error</div>;

  return (
    <ul className="max-w-7xl m-auto grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 justify-between mt-4">
      {data.data.map((product, i) => (
        <li key={product._id}>
          <Card product={product} />
        </li>
      ))}
    </ul>
  );
};

export default Products;
