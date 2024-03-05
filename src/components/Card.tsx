"use client";
import Image from "next/image";
import AddToCartIcon from "@/icons/AddToCartIcon";
import Link from "next/link";
import StarIcon from "@/icons/StarIcon";
import { IProduct } from "@/types/product";
import { useContext } from "react";
import { ACTIONS, CartContext } from "@/providers/cartProvider";

const Card = ({
  product,
  imageWidth,
  imageHeight,
  width,
  height
}: {
  product: IProduct;
  imageWidth: number;
  imageHeight: number;
  width: number;
  height: number;
}) => {
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

  if (!product) return <div>loading</div>;

  return (
    <section className={`bg-white rounded-md overflow-hidden h-[${height}px] w-[${width}px]`}>
      <div className="px-4 py-7 transform hover:scale-105 h-full flex flex-col">
        <Link href={`/product/${product._id}`}>
          <div
            className={`flex justify-center relative h-[${imageHeight}px] w-[${imageWidth}px]`}
          >
            <Image  
              src={product.img}
              alt="laptop"
              fill
              priority
              sizes="(max-width: 768px) 200px 200px, (max-width: 1200px) 276px 276px 276px 276px"
            />
          </div>
          <h4
            className="max-w-[270px] md:text-center text-sm md:text-md font-semibold my-4"
            title={product.name}
          >
            {product.name.slice(0, 180)}
          </h4>
        </Link>
        <ul className="flex my-2 mt-auto">
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
