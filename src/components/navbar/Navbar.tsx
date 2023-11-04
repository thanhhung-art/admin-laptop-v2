"use client";
import Link from "next/link";
import React, { useContext, useRef } from "react";
import CartIcon from "@/icons/CartIcon";
import { CartContext } from "@/providers/cartProvider";
import UserIcon from "@/icons/UserIcon";
import Search from "./Search";

const Navbar = () => {
  const { state } = useContext(CartContext);

  return (
    <nav className="p-4 md:p-5 bg-sky-700 text-white w-full">
      <ul className="flex justify-between items-center gap-2 flex-wrap md:gap-8 lg:gap-16">
        <li className="pr-16 md:pr-0">
          <Link href="/">home</Link>
        </li>

        <li className="flex-1 relative min-w-full order-last md:order-none md:min-w-fit">
          <Search />
        </li>

        <li className="">
          <Link href="/products">All Laptop</Link>
        </li>

        <li>
          <div className="relative">
            <Link href="/cart">
              <CartIcon w={20} h={20} />
            </Link>
            <span className="absolute -top-2 -right-2 bg-orange-500 h-4 w-4 text-[10px] p-1 rounded-full flex justify-center items-center">
              {state.products && state.products.length}
            </span>
          </div>
        </li>

        <li className="">
          <div>
            <Link href="/profile">
              <UserIcon w={50} h={50} />
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
