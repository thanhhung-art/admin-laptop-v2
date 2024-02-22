import { ReactQueryHydrate } from "@/components/ReactQueryHydrate";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { getOrders } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery/queryClient";
import { GetOrders } from "@/utils/keys";
import OrdersPage from "@/views/Orders";
import { dehydrate } from "@tanstack/react-query";

const page = async () => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchQuery([GetOrders], getOrders);
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <OrdersPage />
        </div>
        <Footer />
      </div>
    </ReactQueryHydrate>
  );
};

export default page;
