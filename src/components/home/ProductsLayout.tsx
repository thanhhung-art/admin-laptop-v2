"use client";
import React, { createRef } from "react";
import Image from "next/image";
import Laptop from "@/images/Lg_ultraPc.jpg";
import ArrowNextIcon from "@/icons/ArrowNextIcon";
import ArrowPrevIcon from "@/icons/ArrowPrevIcon";
import StarIcon from "@/icons/StarIcon";
import useMobile from "@/hooks/isMobile";
interface IProps {
  componentName: string;
}

const ProductsLayout = ({ componentName }: IProps) => {
  const containerRef = createRef<HTMLDivElement>();
  const containerElemRef = createRef<HTMLDivElement>();
  const nextBtn = createRef<HTMLSpanElement>();
  const prevBtn = createRef<HTMLSpanElement>();
  const { isMobile, isTable } = useMobile();

  const handleSrollLeft = () => {
    if (
      containerRef.current &&
      containerElemRef.current &&
      nextBtn.current &&
      prevBtn.current
    ) {
      if (isMobile || isTable) {
        if (isMobile) {
          containerRef.current.scrollLeft +=
            containerElemRef.current.clientWidth + 20;
        } else if (isTable) {
          containerRef.current.scrollLeft +=
            containerRef.current.clientWidth + 16;
        }
        if (
          containerRef.current.scrollLeft + containerRef.current.clientWidth >=
          containerRef.current.scrollWidth
        ) {
          nextBtn.current.classList.add("hidden");
        } else {
          prevBtn.current.classList.remove("hidden");
        }
      } else {
        containerRef.current.scrollTo(containerRef.current.scrollWidth, 0);
        nextBtn.current.classList.add("hidden");
        prevBtn.current.classList.remove("hidden");
      }
    }
  };

  const handleSrollRight = () => {
    if (
      containerRef.current &&
      containerElemRef.current &&
      nextBtn.current &&
      prevBtn.current
    ) {
      if (isMobile || isTable) {
        if (isMobile) {
          containerRef.current.scrollLeft -=
            containerElemRef.current.clientWidth + 20;
        } else if (isTable) {
          containerRef.current.scrollLeft -=
            containerRef.current.clientWidth + 16;
        }
        if (containerRef.current.scrollLeft === 0) {
          prevBtn.current.classList.add("hidden");
        } else {
          nextBtn.current.classList.remove("hidden");
        }
      } else {
        containerRef.current.scrollTo(0, containerRef.current.scrollWidth);
        nextBtn.current.classList.remove("hidden");
        prevBtn.current.classList.add("hidden");
      }
    }
  };

  return (
    <section className="max-w-7xl m-auto pb-16 md:pb-24 relative">
      <span
        onClick={handleSrollRight}
        ref={prevBtn}
        className="absolute -left-4 top-1/2 transform -translate-y-1/2 p-2 bg-slate-200 rounded-full cursor-pointer hidden"
      >
        <ArrowPrevIcon w={ isMobile ? 15 : 25} h={isMobile ? 15 : 25} />
      </span>
      <h2 className="text-center text-4xl font-semibold text-slate-100 pb-8">
        {componentName}
      </h2>
      <div
        ref={containerRef}
        className="flex slider_container overflow-auto gap-5 md:gap-4 w-full"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
          <div
            className="bg-white p-4 rounded-md flex-shrink-0 snap-x snap-mandatory-md w-full md:w-[calc(50%-0.5rem)] lg:w-fit"
            key={e}
            ref={containerElemRef}
          >
            <Image
              src={Laptop}
              alt="laptop image"
              width={274}
              className="m-auto"
            />
            <h4 className="mt-4 text-lg lg:max-w-[270px]">
              LG UltraPC 16U70R-K.AAS7U1 Thin and Lightweight Laptop,Gray
            </h4>
            <div className="flex gap-1 py-4">
              {[1, 2, 3, 4, 5].map((e) => (
                <StarIcon key={e} />
              ))}
            </div>
            <h3 className="">$1200</h3>
          </div>
        ))}
      </div>
      <span
        ref={nextBtn}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 p-2 bg-slate-200 rounded-full cursor-pointer"
        onClick={handleSrollLeft}
      >
        <ArrowNextIcon w={ isMobile ? 15 : 25} h={isMobile ? 15 : 25} />
      </span>
    </section>
  );
};

export default ProductsLayout;
