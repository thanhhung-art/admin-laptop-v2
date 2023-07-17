import React from "react";
import TestImage from "@/icons/w692.png";
import Image from "next/image";

const Slider = () => {
  return (
    <section className="flex gap-8 items-center max-w-7xl m-auto bg-white rounded-2xl shadow-md py-4">
      <div className="w-1/2 flex justify-center items-center py-8">
        <Image src={TestImage} alt="test image" />
      </div>
      <div className="w-1/2">
        <h3 className="text-center text-xl pb-4 text-zinc-600">new</h3>
        <h1 className="text-4xl text-center text font-semibold pb-2">
          ExpertBook B9 OLED
        </h1>
        <h2 className="text-center text-2xl pb-6">From $1200</h2>
        <div className="flex justify-center">
          <button className="py-2 px-6 rounded-3xl bg-blue-500 text-white transform active:scale-95">
            Buy
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slider;
