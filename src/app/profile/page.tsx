import { ReactQueryHydrate } from "@/components/ReactQueryHydrate";
import Navbar from "@/components/navbar/Navbar";
import { getUser } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery/queryClient";
import Profile from "@/views/Profile";
import { dehydrate } from "@tanstack/react-query";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Suspense } from "react";

const jwt_secret = process.env.JWT_SECRET;

const page = async () => {
  const cookieStore = cookies();
  let userId = "";
  const authtoken = cookieStore.get("authtoken")?.value || "";
  if (authtoken) {
    const decoded = jwt.verify(authtoken, jwt_secret || "") as { _id: string, isadmin: boolean }
    userId = decoded._id;
  }
  const queryClientLocal = queryClient();
  userId && await queryClientLocal.prefetchQuery(["getUser"], () => getUser(userId));
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Navbar />
      <Suspense fallback={<div>loading</div>}>
        <Profile id={userId} />
      </Suspense>
    </ReactQueryHydrate>
  );
};

export default page;
