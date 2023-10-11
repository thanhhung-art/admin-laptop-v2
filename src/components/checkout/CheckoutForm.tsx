"use client";
import { getUser } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { createRef, useEffect, useState } from "react";

const CheckoutForm = () => {
  const { data } = useQuery(
    ["getUser"],
    () => getUser(localStorage.getItem("user_id") || ""),
    {
      enabled: !!localStorage.getItem("user_id"),
    }
  );

  const username = createRef<HTMLInputElement>();
  const phone = createRef<HTMLInputElement>();
  const email = createRef<HTMLInputElement>();
  const address = createRef<HTMLInputElement>();
  const address2 = createRef<HTMLInputElement>();
  const stripeRef = createRef<HTMLInputElement>();
  const [stripeChecked, setstripeChecked] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (stripeRef.current) stripeRef.current.checked = true;
  }, [])

  return (
    <div className="flex-1">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold">Billing address</h2>
        <section>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            ref={username}
            type="text"
            className="border border-gray-400 outline-none rounded w-full py-1 px-2 p-2 h-8"
            autoComplete="false"
            defaultValue={data?.data ? data?.data.username : ""}
          />
        </section>
        <section>
          <label htmlFor="phone">phone:</label>
          <input
            id="phone"
            ref={phone}
            type="text"
            className="border border-gray-400 outline-none rounded w-full py-1 px-2 p-2 h-8"
            autoComplete="false"
          />
        </section>
        <section>
          <label htmlFor="email">Email (optional):</label>
          <input
            id="email"
            ref={email}
            type="email"
            className="border border-gray-400 outline-none rounded w-full py-1 px-2 p-2 h-8 invalid:border-red-500"
            autoComplete="false"
            defaultValue={data?.data ? data?.data.email : ""}
          />
        </section>
        <section>
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            ref={address}
            type="text"
            className="border border-gray-400 outline-none rounded w-full py-1 px-2 p-2 h-8"
          />
        </section>
        <section>
          <label htmlFor="address_2">Address 2 (optional):</label>
          <input
            id="address_2"
            ref={address2}
            type="text"
            className="border border-gray-400 outline-none rounded w-full py-1 px-2 p-2 h-8"
          />
        </section>
        <section>
          <div>
            <input id="verify save infomation" type="checkbox" />
            <label htmlFor="verify save infomation" className="ml-2">
              Save this infomation for next time
            </label>
          </div>
        </section>
        <h2 className="text-lg font-semibold">Payment</h2>
        <section>
          <input
            id="stripe"
            type="radio"
            name="payment"
            value="credit_card"
            ref={stripeRef}
            onChange={(e) =>
              setstripeChecked(e.target.value === "true" ? false : true)
            }
          />
          <label htmlFor="stripe" className="ml-2 text-sm">
            Credit Card
          </label>
          <br />
          <input
            id="cod"
            type="radio"
            name="payment"
            value="cod"
            onChange={(e) =>
              setstripeChecked(e.target.value === "true" ? true : false)
            }
          />
          <label htmlFor="cod" className="ml-2 text-sm">
            COD
          </label>
        </section>
        <section className="md:min-w-[770px]">
          <div className={`${stripeChecked ? "flex" : "hidden"} flex-col md:flex-row gap-4`}>
            <div>
              <div>
                <label htmlFor="name_on_card" className="">
                  Name on card
                </label>
                <input
                  id="name_on_card"
                  type="text"
                  className="border border-gray-400 outline-none rounded w-full py-1 px-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="credit_card_number">Credit card number</label>
                <input
                  id="credit_card_number"
                  type="text"
                  className="border border-gray-400 outline-none rounded w-full py-1 px-2"
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="expiration">Expiration</label>
                <input
                  id="expiration"
                  type="text"
                  className="border border-gray-400 outline-none rounded w-full py-1 px-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  className="border border-gray-400 outline-none rounded w-full py-1 px-2"
                />
              </div>
            </div>
          </div>
        </section>
        <button className="bg-blue-500 text-white p-2 rounded">
          Continue to checkout
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
