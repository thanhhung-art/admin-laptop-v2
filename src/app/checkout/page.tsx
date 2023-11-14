import Checkout from "@/views/Checkout";
import { cookies } from "next/headers";
import { Suspense } from "react";
import * as jwt from 'jsonwebtoken';
import { queryClient } from "@/lib/reactQuery/queryClient";
import { dehydrate } from "@tanstack/react-query";
import { getUser } from "@/lib/axios";
import { ReactQueryHydrate } from "@/components/ReactQueryHydrate";

const jwt_secret = process.env.JWT_SECRET;

async function page() {
  const cookieStore = cookies();
  const authtoken = cookieStore.get("authtoken")?.value || "";
  const decoded = jwt.verify(authtoken, jwt_secret || "") as { _id: string, isadmin: boolean }
  const queryClientLocal = queryClient();
  decoded._id && await queryClientLocal.prefetchQuery(["getUser"], () => getUser(decoded._id));
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Suspense fallback={<div>loading</div>}>
        <Checkout userId={decoded._id} />
      </Suspense>
    </ReactQueryHydrate>
  );
}

export default page;
