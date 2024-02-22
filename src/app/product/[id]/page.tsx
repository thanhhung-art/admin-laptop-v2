import { ReactQueryHydrate } from "@/components/ReactQueryHydrate";
import Navbar from "@/components/navbar/Navbar";
import { getProduct } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery/queryClient";
import { GetProduct } from "@/utils/keys";
import ProductPage from "@/views/Product";
import { dehydrate } from "@tanstack/react-query";

export default async function Product({ params }: { params: { id: string } }) {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchQuery([GetProduct, params.id], () =>
    getProduct(params.id)
  );
  const dehydratedState = dehydrate(queryClientLocal, {
    shouldDehydrateQuery: () => true,
  });

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Navbar />
      <ProductPage param={params.id} />
    </ReactQueryHydrate>
  );
}
