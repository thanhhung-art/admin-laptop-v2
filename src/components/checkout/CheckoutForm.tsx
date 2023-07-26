'use client'
import React from "react";

const CheckoutForm = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="flex-1">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold">Billing address</h2>
        <section>
          <h3>Username:</h3>
          <input
            type="text"
            className="border border-gray-400 outline-none rounded w-full py-1 px-2 p-2 h-8"
            autoComplete="false"
          />
        </section>
        <section>
          <h3>Email (optional):</h3>
          <input
            type="email"
            className="border border-gray-400 outline-none rounded w-full py-1 px-2 p-2 h-8 invalid:border-red-500"
            autoComplete="false"
          />
        </section>
        <section>
          <h3>Address:</h3>
          <input
            type="text"
            className="border border-gray-400 outline-none rounded w-full py-1 px-2 p-2 h-8"
          />
        </section>
        <section>
          <h3>Address 2 (optional):</h3>
          <input
            type="text"
            className="border border-gray-400 outline-none rounded w-full py-1 px-2 p-2 h-8"
          />
        </section>
        <section>
          <div>
            <input id="verify shipping address" type="checkbox" />
            <label htmlFor="verify shipping address" className="ml-2">
              Shipping address is the same as my billing address
            </label>
          </div>
          <div>
            <input id="verify save infomation" type="checkbox" />
            <label htmlFor="verify save infomation" className="ml-2">
              Save this infomation for next time
            </label>
          </div>
        </section>
        <h2 className="text-lg font-semibold">Payment</h2>
        <section>
          <input id="stripe" type="radio" name="payment" value="stripe" />
          <label htmlFor="stripe" className="ml-2 text-sm">Stripe</label>
          <br />
          <input id="cod" type="radio" name="payment" value="cod" />
          <label htmlFor="cod" className="ml-2 text-sm">COD</label>
        </section>
        <section className="flex flex-col md:flex-row gap-4">
          <div className="">
            <div>
              <h3 className="">Name on card</h3>
              <input type="text" className="border border-gray-400 outline-none rounded w-full py-1 px-2"/>
            </div>
            <div className="mt-2">
              <h3>Credit card number</h3>
              <input type="text" className="border border-gray-400 outline-none rounded w-full py-1 px-2"/>
            </div>
          </div>
          <div className="">
            <div>
              <h3>Expiration</h3>
              <input type="text" className="border border-gray-400 outline-none rounded w-full py-1 px-2" />
            </div>
            <div className="mt-2">
              <h3>CVV</h3>
              <input type="text" className="border border-gray-400 outline-none rounded w-full py-1 px-2" />
            </div>
          </div>
        </section>
        <button className="bg-blue-500 text-white p-2 rounded">Continue to checkout</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
