import Checkout from "@/views/Checkout";
import { cookies } from "next/headers";
import { Suspense } from "react";
import * as jwt from "jsonwebtoken";
import { queryClient } from "@/lib/reactQuery/queryClient";
import { dehydrate } from "@tanstack/react-query";
import { getUser } from "@/lib/axios";
import { ReactQueryHydrate } from "@/components/ReactQueryHydrate";
import { GetUser } from "@/utils/keys";

const jwt_secret = process.env.JWT_SECRET;

async function page() {
  const cookieStore = cookies();
  let userId = "";
  const authtoken = cookieStore.get("authtoken")?.value || "";
  if (authtoken) {
    const decoded = jwt.verify(authtoken, jwt_secret || "") as {
      _id: string;
      isadmin: boolean;
    };
    userId = decoded._id;
  }
  const queryClientLocal = queryClient();
  userId &&
    (await queryClientLocal.prefetchQuery([GetUser], () => getUser(userId)));
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Suspense fallback={<div>loading</div>}>
        <Checkout userId={userId} />
      </Suspense>
    </ReactQueryHydrate>
  );
}

export default page;
