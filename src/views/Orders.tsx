"use client";

import ProductInfo from "@/components/orders/ProductInfo";
import { getOrdersByPhone } from "@/lib/axios";
import { IOrder } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { createRef } from "react";

const OrdersPage = () => {
  const phoneRef = createRef<HTMLInputElement>();

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
                    <ProductInfo
                      products={order.products}
                      deliveryAddress={order.address || order.address2}
                    />
                    <div className="flex justify-between items-center">
                      <h6 className="font-semibold">
                        Status{" "}
                        <span className="text-green-700 ml-2">
                          {order.status}
                        </span>
                      </h6>
                      <button className="bg-blue-500 py-1 px-2 rounded text-white hover:bg-blue-600 active:bg-blue-700">
                        Write review
                      </button>
                    </div>
                  </div>
                );
              })}
          </section>
        </section>
      )}
    </div>
  );
};

export default OrdersPage;
