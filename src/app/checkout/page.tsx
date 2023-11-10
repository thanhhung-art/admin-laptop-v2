import Checkout from "@/views/Checkout";
import React, { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Checkout />
    </Suspense>
  );
}

export default page;
