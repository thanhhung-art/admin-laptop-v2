"use client";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useContext, useMemo, useState } from "react";
import Link from "next/link";
import ArrowBackIcon from "@/icons/ArrowBackIcon";
import ListProducts from "@/components/checkout/ListProducts";
import { CartContext } from "@/providers/cartProvider";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/axios";
import { IProductInCheckout } from "@/types/product";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const { state } = useContext(CartContext);
  const { data } = useQuery(["getProducts"], getProducts);
  const [isPurchased, setIsPurchased] = useState(false);
  const router = useRouter();

  const products = useMemo(() => {
    if (data) {
      const result: IProductInCheckout[] = [];
      state.products.forEach((p) => {
        const index = data.data.findIndex(
          (product) => product._id === p.productId
        );
        if (p.quantity)
          result.push({ ...data.data[index], quantity: p.quantity });
      });
      return result;
    }
  }, [data, state.products]);

  const totalPrice = useMemo(() => {
    if (products)
      return products.reduce((acc, product) => {
        if (product.quantity && product.price)
          return Number((acc + product.quantity * product.price).toFixed(2));
        return Number(acc.toFixed(2));
      }, 0);
    return 0;
  }, [products]);

  return (
    <main className="md:flex md:justify-center md:items-center md:h-screen p-4 md:p-0">
      {isPurchased && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="bg-white rounded-md p-4 max-w-7xl">
            <h1 className="text-2xl md:text-4xl font-semibold text-center">
              Thank you for purchasing!
            </h1>
            <p className="text-center text-gray-600">Our staff will contact you as soon as possible</p>
            <section className="flex justify-center mt-4 gap-4">
              <button
                onClick={() => router.push("/")}
                className="bg-blue-500 text-white rounded-md py-2 px-6"
              >
                home
              </button>
              <button
                onClick={() => router.push("/products")}
                className="bg-blue-500 text-white rounded-md py-2 px-6"
              >
                see other products
              </button>
            </section>
          </div>
        </div>
      )}
      {!isPurchased && (
        <div className="bg-white rounded-md p-4 max-w-7xl">
          <div className="relative">
            <button
              title="Back"
              className="absolute left-0 top-1/2 transform -translate-y-1/2"
            >
              <Link href="/cart">
                <ArrowBackIcon w={25} h={25} />
              </Link>
            </button>
            <h1 className="text-2xl md:text-4xl font-semibold text-center mb-8">
              Checkout Form
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <CheckoutForm totalPrice={totalPrice} setIsPurchased={setIsPurchased} />
            {products && (
              <ListProducts products={products} totalPrice={totalPrice} />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Checkout;
