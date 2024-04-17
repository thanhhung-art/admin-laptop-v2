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
  const queryCategory = searchParams["category"];

  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchInfiniteQuery(
    [GetProductsInfinity, queryBrand, queryCategory],
    ({ pageParam = 0 }) =>
      getProductsInfinity(pageParam, queryBrand, queryCategory)
  );
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Navbar />
      <ProductsPage brand={queryBrand} category={queryCategory} />
    </ReactQueryHydrate>
  );
};

export default Page;
