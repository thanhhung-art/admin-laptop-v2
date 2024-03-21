import { InfiniteData } from "@tanstack/react-query";
import { IProduct } from "@/types/product";
import Card from "../Card";
interface IProps {
  products:
    | InfiniteData<{
        data: { products: IProduct[]; nextPage: number; lastPage: number };
        msg: string;
      }>
    | undefined;
  isLoading: boolean;
  isError: boolean;
}

const Products = ({ products, isError, isLoading }: IProps) => {
  if (isError || !products) return <div>error</div>;

  if (isLoading) return <div>loading</div>;

  return (
    <ul className="max-w-7xl m-auto grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 justify-between mt-4">
      {products.pages
        .reduce((acc, curr) => {
          return acc.concat(curr.data.products);
        }, [] as IProduct[])
        .map((product) => (
          <li key={product._id}>
            <Card product={product} letterQuantity={180} />
          </li>
        ))}
    </ul>
  );
};

export default Products;
