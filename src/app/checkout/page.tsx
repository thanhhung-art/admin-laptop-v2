import Checkout from "@/views/Checkout";
import { Suspense } from "react";

async function page() {
  return (
    <>
      <Suspense fallback={<div>loading</div>}>
        <Checkout />
      </Suspense>
    </>
  );
}

export default page;
