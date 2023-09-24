"use client";
import Image from "next/image";
import AddToCartIcon from "@/icons/AddToCartIcon";
import Link from "next/link";
import StarIcon from "@/icons/StarIcon";
import { IProduct } from "@/types/product";
import { useContext } from "react";
import { CartContext } from "@/providers/cartProvider";
import useLocalStorage from "@/hooks/useLocalStorage";

const Card = ({ product }: { product: IProduct }) => {
  const { state, dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    if (state.products.find((p) => p.id === product._id)) {
      const index = state.products.findIndex((p) => p.id === product._id);
      dispatch({
        action: "INCREASE_QUANTITY",
        payload: { id: product._id },
      });
      window.localStorage.setItem('cart', JSON.stringify(state.products))
      return;
    }

    dispatch({ action: "ADD_TO_CART", payload: { id: product._id, quantity: 1 } });
    window.localStorage.setItem('cart', JSON.stringify(state.products))
  };

  if (!product) return <div>loading</div>;

  return (
    <section className="bg-white rounded-md overflow-hidden">
      <div className="px-4 py-7 transform hover:scale-105">
        <Link href={`/product/${product._id}`}>
          <div className="flex justify-center h-[184px]">
            <Image
              src={product.img}
              alt="laptop"
              width={280}
              height={184}
              priority
              layout="responsive"
            />
          </div>
          <h4 className="max-w-[300px] md:text-center text-sm md:text-md font-semibold mt-4">
            {product.name.slice(0, 100)}
          </h4>
        </Link>
        <ul className="flex my-2">
          {[1, 2, 3, 4, 5].map((e) => (
            <li key={e} className="mr-1">
              <StarIcon />
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <h3>${product.price}</h3>
          <span className="cursor-pointer" onClick={handleAddToCart}>
            <AddToCartIcon w={25} h={25} />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Card;
