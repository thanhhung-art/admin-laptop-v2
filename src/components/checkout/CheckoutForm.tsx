"use client";
import { Fetch } from "@/lib/axios";
import { ICreateOrder, IOrder } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, createRef, useState } from "react";
import { AES } from "crypto-js";
import { useStore } from "@/providers/cartStore";
interface IProps {
  totalPrice: number;
  setIsPurchased: Dispatch<SetStateAction<boolean>>;
}
interface IError {
  response: {
    data: {
      message: string[];
    };
  };
}

const pass_secret = process.env.NEXT_PUBLIC_PASS_SECRET || "";

const CheckoutForm = ({ totalPrice, setIsPurchased }: IProps) => {
  const { clearStore, products } = useStore();
  const username = createRef<HTMLInputElement>();
  const phone = createRef<HTMLInputElement>();
  const email = createRef<HTMLInputElement>();
  const address = createRef<HTMLInputElement>();
  const address2 = createRef<HTMLInputElement>();
  const creditCardRef = createRef<HTMLInputElement>();
  const name_on_card = createRef<HTMLInputElement>();
  const expiration = createRef<HTMLInputElement>();
  const credit_card_number = createRef<HTMLInputElement>();
  const note = createRef<HTMLInputElement>();
  const cvv = createRef<HTMLInputElement>();
  const [creditCardChecked, setCreditCardChecked] = useState(true);

  const [error, setErrors] = useState({
    username: "",
    phone: "",
    email: "",
    address: "",
    address2: "",
    payment: "",
  });

  const createOrder = useMutation(
    async (data: ICreateOrder) => {
      return Fetch.post("/orders", data);
    },
    {
      onError: (e: IError) => {
        e.response.data.message.forEach((message) => {
          const field = message.split(" ")[0];
          error[field as keyof typeof error] = message;
        });
        setErrors(error);
      },
    }
  );

  const productSold = useMutation(
    async (data: { pid: string; sold: number }) => {
      return Fetch.put(`/products/${data.pid}`, { sold: data.sold });
    }
  );

  const handlePayment = () => {
    if (creditCardChecked) {
      if (
        name_on_card.current &&
        name_on_card.current.value !== "" &&
        credit_card_number.current &&
        credit_card_number.current.value !== "" &&
        expiration.current &&
        expiration.current.value !== "" &&
        cvv.current &&
        cvv.current.value !== ""
      ) {
        return `credit_card ${AES.encrypt(
          `${name_on_card.current.value} / ${credit_card_number.current.value} / ${expiration.current.value} / ${cvv.current.value}`,
          pass_secret
        )}`;
      }
    }
    return "cod";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username.current &&
      phone.current &&
      email.current &&
      address2.current &&
      address.current &&
      name_on_card.current &&
      expiration.current &&
      credit_card_number.current &&
      cvv.current &&
      note.current
    ) {
      createOrder.mutate({
        username: username.current?.value,
        email: email.current.value || "",
        phone: phone.current.value,
        address: address.current.value,
        address2: address2.current.value || "",
        products: products,
        payment: handlePayment(),
        status: "pending",
        note: note.current.value || "",
        totalPrice,
      });

      products.forEach((product) => {
        productSold.mutate({
          pid: product.productId,
          sold: product.quantity || 0,
        });
      });

      setIsPurchased(true);
      clearStore();
    }
  };

  const handleRemoveError = (field: keyof typeof error) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="flex-1">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold">Billing address</h2>
        <section>
          <label htmlFor="username">Customer name:</label>
          <input
            id="username"
            required
            ref={username}
            type="text"
            className="border border-gray-400 outline-none rounded w-full p-2"
            autoComplete="false"
            defaultValue={""}
            onFocus={() => handleRemoveError("username")}
            pattern="[A-Za-z ]+"
            title="Only alphabetic characters are allowed."
          />
          <div className="h-2">
            {error.username && (
              <span className="text-red-500 text-sm">{error.username}</span>
            )}
          </div>
        </section>
        <section>
          <label htmlFor="phone">phone:</label>
          <input
            id="phone"
            required
            ref={phone}
            type="text"
            className="border border-gray-400 outline-none rounded w-full p-2"
            autoComplete="false"
            onFocus={() => handleRemoveError("phone")}
            defaultValue={""}
            pattern="[0-9]+$"
            title="type your phone"
            min={10}
          />
          <div className="h-2">
            {error.phone && (
              <span className="text-red-500 text-sm">{error.phone}</span>
            )}
          </div>
        </section>
        <section>
          <label htmlFor="email">Email (optional):</label>
          <input
            id="email"
            ref={email}
            type="email"
            className="border border-gray-400 outline-none rounded w-full p-2 invalid:border-red-500"
            autoComplete="false"
            defaultValue={""}
            title="type your email"
          />
          <div className="h-2">
            {error.email && (
              <span className="text-red-500 text-sm">{error.email}</span>
            )}
          </div>
        </section>
        <section>
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            required
            ref={address}
            type="text"
            className="border border-gray-400 outline-none rounded w-full p-2"
            onFocus={() => handleRemoveError("address")}
            defaultValue={""}
            title="type your address"
          />
          <div className="h-2">
            {error.address && (
              <span className="text-red-500 text-sm">{error.address}</span>
            )}
          </div>
        </section>
        <section>
          <label htmlFor="address_2">Address 2 (optional):</label>
          <input
            id="address_2"
            ref={address2}
            type="text"
            className="border border-gray-400 outline-none rounded w-full p-2"
            defaultValue={""}
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
            id="credit_card"
            type="radio"
            name="payment"
            value="credit_card"
            ref={creditCardRef}
            checked={creditCardChecked}
            onChange={(e) => {
              setCreditCardChecked(e.target.value === "true" ? false : true);
            }}
          />
          <label htmlFor="credit_card" className="ml-2 text-sm">
            Visa Credit/ Debit Card
          </label>
          <br />
          <input
            id="cod"
            type="radio"
            name="payment"
            value="cod"
            checked={!creditCardChecked}
            onChange={(e) => {
              setCreditCardChecked(e.target.value === "true" ? true : false);
            }}
          />
          <label htmlFor="cod" className="ml-2 text-sm">
            COD
          </label>
        </section>
        <section className="md:min-w-[770px]">
          <div
            className={`${
              creditCardChecked ? "flex" : "hidden"
            } flex-col md:flex-row gap-4`}
          >
            <div>
              <div>
                <label htmlFor="name_on_card" className="">
                  Name on card
                </label>
                <input
                  id="name_on_card"
                  type="text"
                  className="border border-gray-400 outline-none rounded w-full py-1 px-2"
                  ref={name_on_card}
                  onFocus={() => handleRemoveError("payment")}
                  title="type your card name"
                />
                <div className="h-2">
                  {error.payment && (
                    <span className="text-red-500 text-sm">
                      {error.payment}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="credit_card_number">Credit card number</label>
                <input
                  id="credit_card_number"
                  type="text"
                  className="border border-gray-400 outline-none rounded w-full py-1 px-2"
                  ref={credit_card_number}
                  onFocus={() => handleRemoveError("payment")}
                  title="type your card number"
                />
                <div className="h-2">
                  {error.payment && (
                    <span className="text-red-500 text-sm">
                      {error.payment}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="expiration">Expiration</label>
                <input
                  id="expiration"
                  type="text"
                  className="border border-gray-400 outline-none rounded w-full py-1 px-2"
                  ref={expiration}
                  onFocus={() => handleRemoveError("payment")}
                  title="type your card expiration"
                />
                <div className="h-2">
                  {error.payment && (
                    <span className="text-red-500 text-sm">
                      {error.payment}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  className="border border-gray-400 outline-none rounded w-full py-1 px-2"
                  ref={cvv}
                  onFocus={() => handleRemoveError("payment")}
                  title="type your card cvv"
                />
                <div className="h-2">
                  {error.payment && (
                    <span className="text-red-500 text-sm">
                      {error.payment}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Note</h2>
          <div>
            <input
              type="text"
              id="note"
              placeholder="Note for seller"
              className="border border-gray-400 outline-none rounded w-full py-1 px-2"
              ref={note}
              title="note for seller"
            />
          </div>
        </section>
        <button className="bg-blue-500 text-white p-2 rounded">
          Complete order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
