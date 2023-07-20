"use client";
import React, { createRef } from "react";
import Image from "next/image";
import Laptop from "@/images/Lg_ultraPc.jpg";
import StarIcon from "@/icons/star.png";
import ArrowIcon from "@/icons/right-arrow.png";

interface IProps {
  componentName: string;
}

const ProductsLayout = ({ componentName }: IProps) => {
  const containerRef = createRef<HTMLDivElement>();
  const nextBtn = createRef<HTMLSpanElement>();
  const prevBtn = createRef<HTMLSpanElement>();

  const handleSrollLeft = () => {
    if (containerRef.current && nextBtn.current && prevBtn.current) {
      containerRef.current.scrollTo(containerRef.current.scrollWidth, 0)
      nextBtn.current.classList.add("hidden");
      prevBtn.current.classList.remove("hidden");
    }
  };

  const handleSrollRight = () => {
    if (containerRef.current && nextBtn.current && prevBtn.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollWidth)
      nextBtn.current.classList.remove("hidden");
      prevBtn.current.classList.add("hidden");
    }
  };

  return (
    <section className="max-w-7xl m-auto pb-24 relative">
      <span
        onClick={handleSrollRight}
        ref={prevBtn}
        className="absolute -left-3 top-1/2 transform -translate-y-1/2 p-2 bg-slate-200 rounded-full cursor-pointer rotate-180 hidden"
      >
        <Image src={ArrowIcon} width={25} alt="arrow left" />
      </span>
      <h2 className="text-center text-4xl font-semibold text-slate-100 pb-8">
        { componentName }
      </h2>
      <div
        ref={containerRef}
        className="flex slider_container overflow-auto gap-5"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
          <div
            className="bg-white p-4 rounded-md flex-shrink-0 snap-x shadow-md"
            key={e}
          >
            <Image src={Laptop} alt="laptop image" width={272} />
            <h4 className="mt-4 text-componentName-product max-w-[270px]">
              LG UltraPC 16U70R-K.AAS7U1 Thin and Lightweight Laptop,Gray
            </h4>
            <div className="flex gap-1 py-4">
              <Image src={StarIcon} alt="star" width={15} height={15} />
              <Image src={StarIcon} alt="star" width={15} height={15} />
              <Image src={StarIcon} alt="star" width={15} height={15} />
              <Image src={StarIcon} alt="star" width={15} height={15} />
              <Image src={StarIcon} alt="star" width={15} height={15} />
            </div>
            <h3 className="">$1200</h3>
          </div>
        ))}
      </div>
      <span
        ref={nextBtn}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 p-2 bg-slate-200 rounded-full cursor-pointer"
        onClick={handleSrollLeft}
      >
        <Image src={ArrowIcon} width={25} alt="arrow left" />
      </span>
    </section>
  );
};

export default ProductsLayout;
