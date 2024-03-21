"use client";

import Products from "@/components/orders/Producs";
import Modal from "@/components/orders/Modal";
import { getOrdersByPhone } from "@/lib/axios";
import { IOrder } from "@/types/order";
import { IProductInCart } from "@/types/product";
import { GetOrdersByPhone } from "@/utils/keys";
import { useQuery } from "@tanstack/react-query";
import { createRef, useEffect, useRef, useState } from "react";

const OrdersPage = () => {
  const phoneRef = createRef<HTMLInputElement>();
  const [currProducts, setCurrProducts] = useState<IProductInCart[]>([]);
  const [sendData, setSendData] = useState(false);
  const dialogRef = createRef<HTMLDialogElement>();
  const openModalRef = createRef<HTMLButtonElement>();
  const currOrder = useRef({
    username: "",
    id: "",
    customerPhone: "",
    reviewed: false,
  })

  const { data, isLoading, isFetched, refetch } = useQuery(
    [GetOrdersByPhone],
    () => getOrdersByPhone(phoneRef.current ? phoneRef.current.value : null),
    {
      enabled:
        typeof phoneRef.current?.value === "string" &&
        phoneRef.current.value.length === 10 &&
        phoneRef.current.value.trim() !== "",
    }
  );

  const handleOpenReview = (
    products: IProductInCart[],
    uname: string,
    orderId: string,
    customerPhone: string,
    isReviewed: boolean
  ) => {
    currOrder.current.username = uname;
    currOrder.current.id = orderId;
    currOrder.current.customerPhone = customerPhone;
    currOrder.current.reviewed = isReviewed;
    setCurrProducts(products);
    dialogRef.current?.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current?.close();
  };

  const handleSendData = () => {
    setSendData(true);
    setTimeout(() => {
      setSendData(false);
    }, 100);
    handleCloseModal();
  };

  useEffect(() => {
    if (sessionStorage.getItem("customer_phone") && phoneRef.current) {
      const phone: string = sessionStorage.getItem("customer_phone") as string;
      phoneRef.current.value = phone;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    <Products products={order.products} />
                    <div className="flex justify-between items-center">
                      <h6 className="font-semibold">
                        Status{" "}
                        <span className="text-green-700 ml-2">
                          {order.status}
                        </span>
                      </h6>
                      <button
                        onClick={() =>
                          handleOpenReview(
                            order.products,
                            order.username,
                            order._id || "",
                            order.phone,
                            order.reviewed
                          )
                        }
                        className="bg-blue-500 py-1 px-2 rounded text-white hover:bg-blue-600 active:bg-blue-700"
                        ref={openModalRef}
                      >
                        {order.reviewed ? "Edit review" : "write review"}
                      </button>
                    </div>
                  </div>
                );
              })}
          </section>
        </section>
      )}

      <dialog ref={dialogRef} className="rounded-lg">
        <Modal
          username={currOrder.current.username}
          sendData={sendData}
          handleCloseModal={handleCloseModal}
          products={currProducts}
          handleSendData={handleSendData}
          orderId={currOrder.current.id}
          customerPhone={currOrder.current.customerPhone}
          isReviewed={currOrder.current.reviewed}
        />
      </dialog>
    </div>
  );
};

export default OrdersPage;
