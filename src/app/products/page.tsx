import { ReactQueryHydrate } from "@/components/ReactQueryHydrate";
import { getProducts } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery/queryClient";
import ProductsPage from "@/views/Products";
import { dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

const Page = async () => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchQuery(["getProducts"], getProducts);
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <ProductsPage />
    </ReactQueryHydrate>
  );
};

export default Page;
