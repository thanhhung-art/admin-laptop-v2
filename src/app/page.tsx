import { ReactQueryHydrate } from '@/components/ReactQueryHydrate';
import { getProducts, getProductsInfinity } from '@/lib/axios';
import { queryClient } from '@/lib/reactQuery/queryClient';
import Home from '@/views/Home'
import { dehydrate } from '@tanstack/react-query';

export default async function page() {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchInfiniteQuery(["getProducts"], ({ pageParam = 0 }) => getProductsInfinity(pageParam));
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Home />
    </ReactQueryHydrate> 
  )
}
