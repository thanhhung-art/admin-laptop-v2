"use client";

import Navbar from "@/components/navbar/Navbar";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <Navbar />
      <div className="px-4">
        <div className="p-8 bg-white max-w-4xl m-auto mt-10 rounded-lg">
          <h2 className="text-center text-3xl font-semibold">
            Something went wrong!
          </h2>
          <div className="flex justify-center">
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white mt-5"
              onClick={() => reset()}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
