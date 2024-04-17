"use client";

import Footer from "@/components/footer/Footer";
import Filters from "@/components/products/Filters";
import Products from "@/components/products/Products";
import { getProductsInfinity } from "@/lib/axios";
import { GetProductsInfinity } from "@/utils/keys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

const ProductsPage = ({
  brand,
  category,
}: {
  brand: string | undefined;
  category: string | undefined;
}) => {
  const [currentPrice, setCurrentPrice] = useState<"up" | "down" | "none">(
    "none"
  );
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [GetProductsInfinity, brand, category],
    ({ pageParam = 0 }) => getProductsInfinity(pageParam, brand, category),
    {
      staleTime: 1000 * 60 * 5,
      getNextPageParam: (lastPage, allPage) => {
        return lastPage.data.nextPage === lastPage.data.lastPage
          ? undefined
          : lastPage.data.nextPage;
      },
    }
  );

  return (
    <div className="bg-sky-500">
      <main className="px-4 md:p-0">
        <Filters />
        <Products
          pages={data}
          isLoading={isLoading}
          currentPrice={currentPrice}
        />
        <div className="flex justify-center my-4 md:mb-16">
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="px-2 py-1 rounded-full bg-white text-gray-700 text-sm transform active:scale-x-95"
            >
              show more
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
