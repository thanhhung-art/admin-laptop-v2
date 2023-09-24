import { ReactQueryHydrate } from '@/components/ReactQueryHydrate';
import { getProducts } from '@/lib/axios';
import { queryClient } from '@/lib/reactQuery/queryClient';
import Home from '@/views/Home'
import { dehydrate } from '@tanstack/react-query';

export default async function page() {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchQuery(["getProducts"], getProducts);
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Home />
    </ReactQueryHydrate> 
  )
}
