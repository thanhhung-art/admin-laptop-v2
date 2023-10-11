import CheckoutForm from "@/components/checkout/CheckoutForm";
import React from "react";
import Link from "next/link";
import ArrowBackIcon from "@/icons/ArrowBackIcon";
import ListProducts from "@/components/checkout/ListProducts";

const Checkout = () => {
  return (
    <main className="md:flex md:justify-center md:items-center md:h-screen p-4 md:p-0">
      <div className="bg-white rounded-md p-4 max-w-7xl">
        <div className="relative">
          <button title="Back" className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <Link href="/cart">
              <ArrowBackIcon w={25} h={25} />
            </Link>
          </button>
          <h1 className="text-2xl md:text-4xl font-semibold text-center mb-8">Checkout Form</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <CheckoutForm />
          <ListProducts />
        </div> 
      </div>
    </main>
  );
};

export default Checkout;
