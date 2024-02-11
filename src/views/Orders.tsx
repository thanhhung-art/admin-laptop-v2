"use client";

import ProductInfo from "@/components/orders/ProductInfo";
import ProductInReview from "@/components/orders/ProductInReview";
import { getOrdersByPhone } from "@/lib/axios";
import { IOrder } from "@/types/order";
import { IProductInCart } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { createRef, useEffect, useState } from "react";

const OrdersPage = () => {
  const phoneRef = createRef<HTMLInputElement>();
  const modalRef = createRef<HTMLDivElement>();
  const usernameRef = createRef<HTMLInputElement>();
  const [username, setUsername] = useState("");
  const [currProducts, setCurrProducts] = useState<IProductInCart[]>([]);
  const [sendData, setSendData] = useState(false);
  const dialogRef = createRef<HTMLDialogElement>();
  const openModalRef = createRef<HTMLButtonElement>();

  const { data, isLoading, isFetched, refetch } = useQuery(
    ["getOrdersByPhone"],
    () => getOrdersByPhone(phoneRef.current ? phoneRef.current.value : null),
    {
      enabled:
        typeof phoneRef.current?.value === "string" &&
        phoneRef.current.value.length === 10 &&
        phoneRef.current.value.trim() !== "",
    }
  );

  const handleOpenReview = (products: IProductInCart[]) => {
    setCurrProducts(products);
    dialogRef.current?.showModal();
  };

  const handleSendData = () => {
    setUsername(usernameRef.current?.value || "");
    setSendData(true);
    setTimeout(() => {
      setSendData(false);
    }, 100);
  };

  useEffect(() => {
    if (sessionStorage.getItem("customer_phone") && phoneRef.current) {
      const phone: string = sessionStorage.getItem("customer_phone") as string;
      phoneRef.current.value = phone;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleCloseModal = (e: MouseEvent) => {
      if (
        dialogRef.current &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        if (dialogRef.current.open && openModalRef.current !== e.target)
          dialogRef.current.close();
      }
    };

    document.addEventListener("click", handleCloseModal);

    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
  });

  return (
    <div className="max-w-7xl m-auto my-8">
      <section>
        <div className="mb-6 bg-white rounded flex">
          <input
            type="text"
            title="search orders"
            placeholder="Type your phone number"
            className="px-2 py-1 rounded flex-1 outline-none text-sm"
            ref={phoneRef}
          />
          <button
            onClick={() =>
              phoneRef.current?.value.trim() !== "" &&
              phoneRef.current?.value.length === 10
                ? refetch()
                : undefined
            }
            className="p-2 rounded bg-blue-500 text-white disabled:bg-gray-500 hover:bg-blue-600 active:bg-blue-700"
          >
            search
          </button>
        </div>
      </section>
      {isFetched && !isLoading && (
        <section className="rounded-lg pt-0">
          <div className="flex gap-2 justify-between">
            <h2 className="text-white mb-4 font-bold text-2xl">Orders</h2>
            <div>
              <select
                title="status orders"
                name="status orders"
                id="type"
                className="rounded"
              >
                <option value="all">all</option>
                <option value="delivering">delivering</option>
                <option value="delivered">deliverd</option>
              </select>
            </div>
          </div>
          <section className="flex flex-col gap-8">
            {data &&
              data.data.map((order: IOrder) => {
                const dateObj = new Date(order.createdAt as string);
                const hours = dateObj.getHours();
                const minutes = dateObj.getMinutes();
                const dateReformated = dateObj.toLocaleDateString(
                  navigator.language,
                  {
                    year: "numeric",
                    day: "2-digit",
                    month: "2-digit",
                  }
                );

                return (
                  <div key={order._id} className="bg-white rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">
                        Order #{order._id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Order placed {hours}: {minutes} - {dateReformated}
                      </p>
                    </div>
                    <ProductInfo products={order.products} />
                    <div className="flex justify-between items-center">
                      <h6 className="font-semibold">
                        Status{" "}
                        <span className="text-green-700 ml-2">
                          {order.status}
                        </span>
                      </h6>
                      <button
                        onClick={() => handleOpenReview(order.products)}
                        className="bg-blue-500 py-1 px-2 rounded text-white hover:bg-blue-600 active:bg-blue-700"
                        ref={openModalRef}
                      >
                        Write review
                      </button>
                    </div>
                  </div>
                );
              })}
          </section>
        </section>
      )}
      <dialog ref={dialogRef} className="rounded-lg">
        <section className="flex justify-center items-center">
          <div className="max-w-3xl bg-white rounded-lg p-8" ref={modalRef}>
            <div className="mb-4">
              <input
                className="outline-none ml-2 border border-blue-400 rounded px-4 py-2 w-96"
                type="text"
                placeholder="enter your name"
                ref={usernameRef}
              />
            </div>
            {currProducts.map((product) => (
              <div key={product.productId}>
                <ProductInReview
                  product={product}
                  usernameRef={username}
                  sendData={sendData}
                />
              </div>
            ))}
            <div>
              <button
                className="float-right px-2 py-1 bg-blue-500 rounded text-white mt-2"
                onClick={handleSendData}
              >
                send
              </button>
            </div>
          </div>
        </section>
      </dialog>
    </div>
  );
};

export default OrdersPage;
