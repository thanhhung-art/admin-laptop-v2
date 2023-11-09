"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Brands from "@/components/products/Brands";
import Filters from "@/components/products/Filters";
import Products from "@/components/products/Products";
import { getProductsInfinity } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const ProductsPage = () => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["getProducts"],
    ({ pageParam = 0 }) => getProductsInfinity(pageParam),
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
      {/* <Navbar /> */}
      <main className="px-4 md:p-0">
        <Brands />
        <Filters />
        <Products products={data} isLoading={isLoading} isError={isError} />
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
