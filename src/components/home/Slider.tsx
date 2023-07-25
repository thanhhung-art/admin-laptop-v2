"use client";
import React, { createRef, useEffect, useRef } from "react";
import TestImage from "@/images/w692.png";
import Image from "next/image";
import ArrowNextIcon from "@/icons/ArrowNextIcon";
import ArrowPrevIcon from "@/icons/ArrowPrevIcon";

const Slider = () => {
  const sliderPosition = useRef(1);
  const containerRef = createRef<HTMLDivElement>();
  const nextBtn = createRef<HTMLDivElement>();
  const prevBtn = createRef<HTMLDivElement>();
  const dots = useRef<NodeListOf<Element>>();
  const autoScroll = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (document) {
      dots.current = document.querySelectorAll(".dots");
    }
  }, []);

  const changeDotsColor = (index: number) => {
    if (dots.current) {
      for (let i = 0; i < dots.current.length; i++) {
        if (i === index) {
          dots.current[i].classList.add("bg-slate-300");
          dots.current[i].classList.remove("bg-slate-600");
        } else {
          dots.current[i].classList.add("bg-slate-600");
          dots.current[i].classList.remove("bg-slate-300");
        }
      }
    }
  };

  const handleScrollLeft = () => {
    // when go to end of slide
    if (sliderPosition.current === 4) {
      if (containerRef.current && prevBtn.current) {
        containerRef.current.scrollTo(0, 0);
        prevBtn.current.style.display = "none";
      }
      sliderPosition.current = 1;
      changeDotsColor(0);
      return;
    }
    if (containerRef.current && prevBtn.current) {
      containerRef.current.scrollLeft += containerRef.current.clientWidth;
      prevBtn.current.style.display = "block";
    }
    changeDotsColor(sliderPosition.current);
    sliderPosition.current++;
  };

  const handleScrollRight = () => {
    // when go to head of slide
    if (sliderPosition.current === 1) {
      if (prevBtn.current) prevBtn.current.style.display = "none";
      changeDotsColor(0);
      return;
    }

    if (containerRef.current && prevBtn.current) {
      containerRef.current.scrollLeft -= containerRef.current.clientWidth;
      prevBtn.current.style.display = "block";
    }

    sliderPosition.current--;
    changeDotsColor(sliderPosition.current - 1);
  };

  const handleNext = () => {
    handleScrollLeft();
    clearInterval(autoScroll.current);
    autoScroll.current = setInterval(handleScrollLeft, 5000);
  };

  const handlePrev = () => {
    handleScrollRight();
    clearInterval(autoScroll.current);
    autoScroll.current = setInterval(handleScrollLeft, 5000);
  };

  useEffect(() => {
    autoScroll.current = setInterval(handleScrollLeft, 5000);

    return () => {
      clearInterval(autoScroll.current);
    };
  });

  return (
    <section className="relative max-w-7xl m-auto bg-white rounded-2xl shadow-md py-8">
      <div
        className="flex overflow-x-auto slider_container snap-x"
        ref={containerRef}
      >
        {/* arrow left */}
        <div
          className="absolute transform -translate-y-1/2 top-1/2 p-2 bg-slate-100 hover:bg-slate-300 cursor-pointer rounded-full"
          onClick={handlePrev}
          ref={prevBtn}
          style={{ display: "none" }}
        >
          <ArrowPrevIcon h={30} w={30} />
        </div>

        {[1, 2, 3, 4].map((e, i) => (
          <Child key={i} index={i + 1} />
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
          <div className="w-2 h-2 bg-slate-300 rounded-full dots"></div>
          <div className="w-2 h-2 bg-slate-600 rounded-full dots"></div>
          <div className="w-2 h-2 bg-slate-600 rounded-full dots"></div>
          <div className="w-2 h-2 bg-slate-600 rounded-full dots"></div>
        </div>
      </div>
    </section>
  );
};

function Child({ index }: { index: number }) {
  return (
    <div
      className="flex flex-col gap-6 md:gap-8 items-center flex-shrink-0 w-full snap-center md:flex-row md:p-4 lg:p-0"
      id={`slider_child_${index}`}
    >
      <div className="w-full md:w-1/2 flex justify-center items-center p-4">
        <Image src={TestImage} alt="test image" />
      </div>

      <div className="w-full md:w-1/2">
        <h3 className="text-center text-xl text-zinc-600 pb-2 md:pb-4">new</h3>
        <h1 className="text-4xl text-center text font-semibold pb-2">
          ExpertBook B9 OLED
        </h1>
        <h2 className="text-center text-2xl pb-6">From $1200</h2>
        <div className="flex justify-center mb-[0.9rem]">
          <button className="py-2 px-6 rounded-3xl bg-blue-500 text-white transform active:scale-95">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slider;
