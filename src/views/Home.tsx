'use client'
import Labels from "@/components/home/Labels";
import Slider from "@/components/home/Slider";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import ProductsLayout from "@/components/home/ProductsLayout";
import Footer from "@/components/footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/axios";

export default function Home() {
  const { data } = useQuery(['getUser'], () => getUser(localStorage.getItem('user_id') || ""), {
    enabled: !!localStorage.getItem('user_id'),
  })

  return (
    <main className="bg-sky-500">
      <Navbar />
      <div className="px-4">
        <header className="py-8 my-4 md:my-0 md:py-16">
          <Slider />
        </header>
        <Labels />
        <ProductsLayout componentName="Flash Sale" />
        <ProductsLayout componentName="Best Seller" />
        <ProductsLayout componentName="Featured Products" />
        <ProductsLayout componentName="Macbook" />
      </div>
      <Footer />
    </main>
  );
}
