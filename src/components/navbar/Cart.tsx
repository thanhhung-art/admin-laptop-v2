"use client";
import CartIcon from "@/icons/CartIcon";
import { useStore } from "@/providers/cartStore";

const Cart = () => {
  const { products } = useStore();

  return (
    <div className="relative">
      <CartIcon w={20} h={20} />
      <span className="absolute -top-2 -right-2 bg-orange-500 h-4 w-4 text-[10px] p-1 rounded-full flex justify-center items-center">
        {products.length}
      </span>
    </div>
  );
};

export default Cart;
