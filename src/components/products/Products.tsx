import { InfiniteData } from "@tanstack/react-query";
import { IProduct } from "@/types/product";
import Card from "../Card";
import { useMemo } from "react";
import CardPlaceholder from "../placeholders/slider/cardPlaceholder";
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
  const products = useMemo(() => {
    if (!pages) return [];

    return pages.pages.reduce((acc, curr) => {
      return acc.concat(curr.data.products);
    }, [] as IProduct[]);
  }, [pages]);

  if (products.length === 0)
    return <div className="text-center text-white">no products found</div>;

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
            <Card product={product} letterQuantity={180} />
          </li>
        ))}
      {isLoading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e) => <CardPlaceholder key={e} />)}
    </ul>
  );
};

export default Products;
