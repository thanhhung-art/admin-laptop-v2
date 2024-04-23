import { ReactQueryHydrate } from "@/components/ReactQueryHydrate";
import { getProducts } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery/queryClient";
import {
  GetFeaturedProducts,
  GetTopRatingProducts,
  GetTopSellProducts,
} from "@/utils/keys";
import Home from "@/views/Home";
import { dehydrate } from "@tanstack/react-query";

export default async function page() {
  const queryClientLocal = queryClient();
  await Promise.all([
    queryClientLocal.prefetchQuery([GetFeaturedProducts], () =>
      getProducts("featured")
    ),
    queryClientLocal.prefetchQuery([GetTopSellProducts], () =>
      getProducts("top_sell_products")
    ),
    queryClientLocal.prefetchQuery([GetTopRatingProducts], () =>
      getProducts("top_rating_products")
    ),
  ]);

  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Home />
    </ReactQueryHydrate>
  );
}
