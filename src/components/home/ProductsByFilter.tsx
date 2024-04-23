"use client";
import { createRef, useMemo } from "react";
import ArrowNextIcon from "@/icons/ArrowNextIcon";
import ArrowPrevIcon from "@/icons/ArrowPrevIcon";
import useMobile from "@/hooks/isMobile";
import { useQuery } from "@tanstack/react-query";
import { GetTopSellProducts } from "@/utils/keys";
import { getProducts } from "@/lib/axios";
import CardPlaceholder from "../placeholders/cardPlaceholder";
import Card from "@/components/product/Card";

interface IProps {
  componentName: string;
  queryKey: "getTopSellProducts" | "getTopRatingProducts";
}

const ProductsByFilter = ({ componentName, queryKey }: IProps) => {
  const containerRef = createRef<HTMLDivElement>();
  const nextBtn = createRef<HTMLSpanElement>();
  const prevBtn = createRef<HTMLSpanElement>();
  const { isMobile, isTable } = useMobile();

  const { data } = useQuery([queryKey], () =>
    queryKey === GetTopSellProducts
      ? getProducts("top_sell_products")
      : getProducts("top_rating_products")
  );

  const handleSrollLeft = () => {
    if (containerRef.current && nextBtn.current && prevBtn.current) {
      if (isMobile || isTable) {
        if (isMobile) {
          containerRef.current.scrollLeft += containerRef.current.clientWidth;
        } else if (isTable) {
          containerRef.current.scrollLeft += containerRef.current.clientWidth;
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
    if (containerRef.current && nextBtn.current && prevBtn.current) {
      if (isMobile || isTable) {
        if (isMobile) {
          containerRef.current.scrollLeft -= containerRef.current.clientWidth;
        } else if (isTable) {
          containerRef.current.scrollLeft -= containerRef.current.clientWidth;
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

  const products = useMemo(() => {
    if (!data)
      return [1, 2, 3, 4].map((e) => (
        <CardPlaceholder
          key={e}
          width={{ sm: "w-[calc(50%-4px)]", md: "md:w-calc(25%-13px)" }}
        />
      ));

    return data.data.map((p) => (
      <Card
        product={p}
        key={p._id}
        width={{ sm: "w-[calc(50%-4px)]", md: "md:w-[calc(25%-13px)]" }}
        isMobile={isMobile}
      />
    ));
  }, [data, isMobile]);

  return (
    <section className="max-w-7xl m-auto pb-8 md:pb-24 relative">
      <span
        onClick={handleSrollRight}
        ref={prevBtn}
        className="absolute -left-4 top-1/2 transform -translate-y-1/2 p-2 bg-slate-200 rounded-full cursor-pointer hidden"
      >
        <ArrowPrevIcon w={isMobile ? 15 : 25} h={isMobile ? 15 : 25} />
      </span>
      <h2 className="text-center text-2xl md:text-4xl font-semibold text-slate-100 pb-4 md:pb-8">
        {componentName}
      </h2>
      <div
        ref={containerRef}
        className="flex slider_container overflow-x-auto gap-1 md:gap-4 snap-mandatory"
      >
        {products}
      </div>
      <span
        ref={nextBtn}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 p-2 bg-slate-200 rounded-full cursor-pointer"
        onClick={handleSrollLeft}
      >
        <ArrowNextIcon w={isMobile ? 15 : 25} h={isMobile ? 15 : 25} />
      </span>
    </section>
  );
};

export default ProductsByFilter;
