import CheckoutForm from "@/components/checkout/CheckoutForm";
import ListProducts from "@/components/checkout/ListProducts";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

const Checkout = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-md p-4 max-w-7xl">
        <div className="relative">
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <Link href="/cart">
              <ArrowBackIcon/>
            </Link>
          </button>
          <h1 className="text-4xl font-semibold text-center mb-8">Checkout Form</h1>
        </div>
        <div className="flex gap-4">
          <CheckoutForm />
          <ListProducts />
        </div> 
      </div>
    </main>
  );
};

export default Checkout;
