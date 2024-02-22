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
    <section className="">
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
