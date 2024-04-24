"use client";
import React, { createRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ArrowNextIcon from "@/icons/ArrowNextIcon";
import ArrowPrevIcon from "@/icons/ArrowPrevIcon";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/axios";
import { GetFeaturedProducts } from "@/utils/keys";
import Rating from "../Rating";
import SliderPlaceholder from "../placeholders/slider/sliderPlaceholder";
import Link from "next/link";

const Slider = () => {
  const sliderPosition = useRef(1);
  const containerRef = createRef<HTMLDivElement>();
  const nextBtn = createRef<HTMLDivElement>();
  const prevBtn = createRef<HTMLDivElement>();
  const autoScroll = useRef<NodeJS.Timer>();
  const { data, isLoading } = useQuery([GetFeaturedProducts], () =>
    getProducts("featured")
  );

  const changeDotsColor = (index: number) => {
    const dots = document.querySelectorAll(".dots");
    dots.forEach((e, i) => {
      if (index === i) {
        e.classList.add("bg-slate-300");
        e.classList.remove("bg-slate-600");
      } else {
        e.classList.add("bg-slate-600");
        e.classList.remove("bg-slate-300");
      }
    });
  };

  const handleScrollRight = () => {
    if (data && containerRef.current) {
      // if slide go to end
      if (sliderPosition.current === data.data.length) {
        if (containerRef.current && prevBtn.current) {
          sliderPosition.current = 1;
          containerRef.current.scrollTo(0, 0);
          nextBtn.current?.classList.remove("hidden");
          prevBtn.current?.classList.add("hidden");
        }
        // if slide go to head
      } else if (sliderPosition.current - 1 === 0) {
        sliderPosition.current = 2;
        containerRef.current.scrollLeft += containerRef.current.clientWidth;
        prevBtn.current?.classList.remove("hidden");
      } else {
        sliderPosition.current++;
        containerRef.current.scrollLeft += containerRef.current.clientWidth;
        if (sliderPosition.current === data.data.length) {
          nextBtn.current?.classList.add("hidden");
        }
      }
    }
    changeDotsColor(sliderPosition.current - 1);
  };

  const handleScrollLeft = () => {
    if (sliderPosition.current === 2) {
      prevBtn.current?.classList.add("hidden");
    }

    // when go to head of slide
    if (sliderPosition.current === 1) {
      nextBtn.current?.classList.remove("hidden");
      changeDotsColor(0);
      return;
    }

    if (containerRef.current && prevBtn.current) {
      containerRef.current.scrollLeft -= containerRef.current.clientWidth;
    }

    sliderPosition.current--;
    changeDotsColor(sliderPosition.current - 1);
  };

  const handleNext = () => {
    handleScrollRight();
    clearInterval(autoScroll.current);
    autoScroll.current = setInterval(handleScrollRight, 5000);
  };

  const handlePrev = () => {
    handleScrollLeft();
    clearInterval(autoScroll.current);
    autoScroll.current = setInterval(handleScrollRight, 5000);
  };

  useEffect(() => {
    autoScroll.current = setInterval(handleScrollRight, 5000);

    return () => {
      clearInterval(autoScroll.current);
    };
  });

  if (isLoading) return <SliderPlaceholder />;

  return (
    <section className="relative max-w-7xl m-auto bg-white rounded-2xl shadow-md p-4 md:p-8 border">
      <div
        className="flex overflow-x-auto slider_container snap-x"
        ref={containerRef}
      >
        {/* arrow left */}

        <div
          className="absolute transform -translate-y-1/2 top-1/2 p-2 bg-slate-100 hover:bg-slate-300 cursor-pointer rounded-full z-40"
          onClick={handlePrev}
          ref={prevBtn}
        >
          <ArrowPrevIcon h={30} w={30} />
        </div>

        {data &&
          data.data.map((p, i) => (
            <Child
              key={p._id}
              index={i + 1}
              srcImg={p.img}
              productName={p.name}
              productPrice={p.price}
              rating={p.rating}
              productId={p._id}
            />
          ))}

        {/* arrow right */}

        <div
          className="absolute right-0 transform -translate-y-1/2 top-1/2 p-2 bg-slate-100 hover:bg-slate-300 cursor-pointer rounded-full"
          onClick={handleNext}
          ref={nextBtn}
        >
          <ArrowNextIcon h={30} w={30} />
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 pb-2">
          {data &&
            data.data.map((p, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${
                  i === 0 ? "bg-slate-300" : "bg-slate-600"
                } rounded-full dots`}
              ></div>
            ))}
        </div>
      </div>
    </section>
  );
};

interface IChildProps {
  index: number;
  srcImg: string;
  productName: string;
  productPrice: number;
  rating: number;
  productId: string;
}

function Child({
  index,
  srcImg,
  productName,
  productPrice,
  rating,
  productId,
}: IChildProps) {
  return (
    <div
      className="flex flex-col gap-6 md:gap-8 items-center flex-shrink-0 w-full snap-center md:flex-row md:p-4 lg:p-0"
      id={`slider_child_${index}`}
    >
      <div className="w-full md:w-1/2 flex justify-center items-center p-4">
        <div className="relative h-[200px] md:h-[370px] w-[570px]">
          <Image
            src={srcImg}
            alt="test image"
            fill
            priority
            sizes="(max-width: 768px) width: 100%, (max-width: 1200px) width: 100%"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <h1
          className="text-md md:text-2xl text-center text font-semibold pb-2"
          title={productName}
        >
          {productName.slice(0, 130)}...
        </h1>
        <div className="flex justify-center mb-2">
          <Rating value={rating} readonly />
        </div>
        <h2 className="text-center text-2xl pb-6">
          $<b>{productPrice}</b>
        </h2>
        <div className="flex justify-center mb-[0.9rem]">
          <Link href={`/product/${productId}`}>
            <button className="py-2 px-6 rounded-3xl bg-blue-500 text-white transform active:scale-95">
              See product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Slider;
