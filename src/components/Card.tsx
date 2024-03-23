import { ACTIONS, CartContext } from "@/providers/cartProvider";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Rating from "./Rating";

interface IProps {
  product: IProduct;
  letterQuantity: number;
}
const Card = ({ product, letterQuantity }: IProps) => {
  const { state, dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    if (state.products.find((p) => p.productId === product._id)) {
      dispatch({
        action: ACTIONS.INCREASE_QUANTITY,
        payload: { productId: product._id },
      });
      return;
    }

    dispatch({
      action: ACTIONS.ADD_TO_CART,
      payload: { productId: product._id },
    });
  };

  return (
    <div className={`max-w-2xl mx-auto w-[308px]`}>
      <div className="bg-white shadow-md rounded-lg max-w-sm  dark:border-gray-700">
        <Link href={`/product/${product._id}`}>
          <div className={`relative h-52`}>
            <Image
              className="rounded-t-lg p-8"
              src={product.img}
              alt="product image"
              fill
              sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
            />
          </div>
        </Link>
        <div className="px-5 pb-5">
          <Link href={`/product/${product._id}`}>
            <h3
              className="font-semibold text-md tracking-tight min-h-[143.95px]"
              title={product.name}
            >
              {product.name.slice(0, letterQuantity)}
            </h3>
          </Link>
          <div className="flex items-center mt-2.5 mb-5">
            <Rating value={product.rating} readonly />
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              {product.rating}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
