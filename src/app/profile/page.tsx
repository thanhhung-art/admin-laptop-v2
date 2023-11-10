'use server'
import { ReactQueryHydrate } from "@/components/ReactQueryHydrate";
import Navbar from "@/components/navbar/Navbar";
import { getUser } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery/queryClient";
import Profile from "@/views/Profile";
import { dehydrate } from "@tanstack/react-query";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const jwt_secret = process.env.JWT_SECRET;

const page = async () => {
  const cookieStore = cookies();
  const authtoken = cookieStore.get("authtoken")?.value || "";
  const decoded = jwt.verify(authtoken, jwt_secret || "") as { _id: string, isadmin: boolean }
  const queryClientLocal = queryClient();
  decoded._id && await queryClientLocal.prefetchQuery(["getUser"], () => getUser(decoded._id));
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Navbar />
      <Profile id={decoded._id} />
    </ReactQueryHydrate>
  );
};

export default page;
