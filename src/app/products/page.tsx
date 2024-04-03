import { ReactQueryHydrate } from "@/components/ReactQueryHydrate";
import Navbar from "@/components/navbar/Navbar";
import { getProductsInfinity } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery/queryClient";
import { GetProductsInfinity } from "@/utils/keys";
import ProductsPage from "@/views/Products";
import { dehydrate } from "@tanstack/react-query";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const queryBrand = searchParams["brand"];
  const queryFilter = searchParams["filter"];

  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchInfiniteQuery(
    [GetProductsInfinity, queryBrand, queryFilter],
    ({ pageParam = 0 }) =>
      getProductsInfinity(pageParam, queryBrand, queryFilter)
  );
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Navbar />
      <ProductsPage brand={queryBrand} filter={queryFilter} />
    </ReactQueryHydrate>
  );
};

export default Page;
