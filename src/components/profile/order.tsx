"use client";

import { getProduct } from "@/lib/axios";
import { IOrder } from "@/types/order";
import { formatTime } from "@/utils/formatTime";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";

interface IProps {
  order: IOrder;
}
const Order = ({ order }: IProps) => {
  const products = useQueries({
    queries: order.products.map((p) => ({
      queryKey: ["getProduct", p.productId],
      queryFn: () => getProduct(p.productId),
    })),
  }).map((res) => {
    if (res.data === undefined) return undefined;
    const quantity =
      order.products[
        order.products.findIndex((p) => p.productId === res.data.data._id)
      ].quantity;
    return {
      quantity: quantity || 1,
      name: res.data.data.name,
      img: res.data.data.img,
      _id: res.data.data._id,
    };
  });

  return (
    <section>
      {products.map((p, i) => (
        <div key={p?._id || i}>
          {p === undefined ? (
            <div>loading</div>
          ) : (
            <div className="shadow-lg p-4 bg-white rounded-md">
              <div className="flex justify-end">
                <span className="text-[13px] text-slate-500">{formatTime(order.createdAt)}</span>
              </div>
              <div className="flex gap-4">
                <div className="relative w-28 h-16">
                  <Image
                    src={p.img}
                    fill
                    sizes="(max-width: 768px) 112px, (max-width: 1200px): 112px"
                    alt="product image"
                  />
                </div>
                <div>
                  <h4 className="text-sm">{p.name}</h4>
                  <p className="text-sm">quantity: {p.quantity}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <h3 className="">{order.status}</h3>
              </div>
              <div className="flex gap-4 justify-end mt-2">
                <h3 className="text-blue-600 cursor-pointer">write review</h3>
                <h3>Cost: ${order.totalPrice}</h3>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Order;
