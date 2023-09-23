"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Brands from "@/components/products/Brands";
import Filters from "@/components/products/Filters";
import Products from "@/components/products/Products";
import { getProducts } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const ProductsPage = () => {
  const { data } = useQuery(["getProducts"], getProducts, { staleTime: 1000 * 60 * 5 });

  return (
    <div className="bg-sky-500">
      <Navbar />
      <main className="px-4 md:p-0">
        <Brands />
        <Filters />
        <Products />
        <div className="flex justify-center my-4 md:mb-16">
          {data?.data.length !== 0 ||
            (data.data.length < 9 && (
              <button className="px-2 py-1 rounded-full bg-white text-gray-700 text-sm transform active:scale-x-95">
                show more
              </button>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
