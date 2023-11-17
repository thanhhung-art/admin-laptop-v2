import { IOrder } from "@/types/order";
import Order from "./order";
import { Fragment, Suspense } from "react";

interface IProps {
  orders: IOrder[] | undefined;
}
const UserOrders = ({ orders }: IProps) => {

  if (orders === undefined) {
    return <div>loading</div>
  }

  return (
    <section className="bg-white rounded-lg p-4">
      <h2 className="text-xl">Orders</h2>
      {orders.map((order) => (
        <Fragment key={order._id}>
          <Suspense>
            <Order order={order} />
          </Suspense>
        </Fragment>
      ))}
    </section>
  );
};

export default UserOrders;
