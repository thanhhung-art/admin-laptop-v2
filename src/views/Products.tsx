"use client";

import Footer from "@/components/footer/Footer";
import Filters from "@/components/products/Filters";
import Products from "@/components/products/Products";
import { getProductsInfinity } from "@/lib/axios";
import { GetProductsInfinity } from "@/utils/keys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProductsPage = ({
  brand,
  filter,
}: {
  brand: string | undefined;
  filter: string | undefined;
}) => {
  const router = useRouter();
  const [currentPrice, setCurrentPrice] = useState<"up" | "down" | "none">(
    "none"
  );
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery(
      [GetProductsInfinity, brand, filter],
      ({ pageParam = 0 }) => getProductsInfinity(pageParam, brand, filter),
      {
        staleTime: 1000 * 60 * 5,
        getNextPageParam: (lastPage, allPage) => {
          return lastPage.data.nextPage === lastPage.data.lastPage
            ? undefined
            : lastPage.data.nextPage;
        },
      }
    );

  const handleSetFilter = ({
    brandOption,
    filterOption,
  }: {
    brandOption?: string;
    filterOption?: string;
  }) => {
    let queryParams: string[] = [];

    if (brandOption) {
      queryParams.push(`brand=${brandOption}`);
    } else if (brand) {
      queryParams.push(`brand=${brand}`);
    }

    if (filterOption) {
      queryParams.push(`filter=${filterOption}`);
    } else if (filter) {
      queryParams.push(`filter=${filter}`);
    }

    let fullUrl = `?${queryParams.join("&")}`;
    router.replace(fullUrl, { scroll: false });
  };

  const handleSetPriceUpDown = (value: "up" | "down" | "none") => {
    setCurrentPrice(value);
  };

  return (
    <div className="bg-sky-500">
      <main className="px-4 md:p-0">
        <Filters
          handleSetFilter={handleSetFilter}
          handleSetPriceUpDown={handleSetPriceUpDown}
        />
        <Products
          pages={data}
          isLoading={isLoading}
          filter={filter === "noBrand" ? undefined : filter}
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
