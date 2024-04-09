import { InfiniteData } from "@tanstack/react-query";
import { IProduct } from "@/types/product";
import Card from "../Card";
import { useMemo } from "react";
import useMobile from "@/hooks/isMobile";
interface IProps {
  pages:
    | InfiniteData<{
        data: { products: IProduct[]; nextPage: number; lastPage: number };
        msg: string;
      }>
    | undefined;
  isLoading: boolean;
  filter?: string;
  currentPrice: "up" | "down" | "none";
}

const Products = ({ pages, isLoading, filter, currentPrice }: IProps) => {
  const { isMobile } = useMobile();
  const products = useMemo(() => {
    if (!pages) return [];

    return pages.pages.reduce((acc, curr) => {
      return acc.concat(curr.data.products);
    }, [] as IProduct[]);
  }, [pages]);

  if (products.length === 0)
    return <div className="text-center text-white">No products found</div>;

  return (
    <ul className="max-w-7xl m-auto grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 justify-between mt-4">
      {products
        .sort((a, b) => {
          if (currentPrice === "up") return a.price - b.price;
          if (currentPrice === "down") return b.price - a.price;
          return 0;
        })
        .map((product) => (
          <li key={product._id}>
            <Card
              product={product}
              letterQuantity={isMobile ? 120 : 180 }
              imageHeight={{ sm: 'min-h-[130px]', md: 'min-h-[200px]' }}
              type="small"
              fontSize={{ sm: "text-sm", md: "text-base" }}
              colorsCenter
              starsCenter
            />
          </li>
        ))}
    </ul>
  );
};

export default Products;
