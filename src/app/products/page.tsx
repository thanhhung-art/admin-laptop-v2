import { ReactQueryHydrate } from "@/components/ReactQueryHydrate";
import Navbar from "@/components/navbar/Navbar";
import { getProductsInfinity } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery/queryClient";
import { GetProductsInfinity } from "@/utils/keys";
import ProductsPage from "@/views/Products";
import { dehydrate } from "@tanstack/react-query";

const Page = async () => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchInfiniteQuery(
    [GetProductsInfinity],
    ({ pageParam = 0 }) => getProductsInfinity(pageParam)
  );
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Navbar />
      <ProductsPage />
    </ReactQueryHydrate>
  );
};

export default Page;
