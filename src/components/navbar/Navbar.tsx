"use client";
import Link from "next/link";
import React, { useContext, useRef } from "react";
import CartIcon from "@/icons/CartIcon";
import SearchIcon from "@/icons/SearchIcon";
import { CartContext } from "@/providers/cartProvider";
import UserIcon from "@/icons/UserIcon";

const Navbar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const { state } = useContext(CartContext);

  return (
    <nav className="p-4 md:p-5 bg-sky-700 text-white w-full">
      <ul className="flex justify-between items-center gap-2 flex-wrap md:gap-8 lg:gap-16">
        <li className="pr-16 md:pr-0">
          <Link href="/">home</Link>
        </li>

        <li className="flex-1 relative min-w-full order-last md:order-none md:min-w-fit">
          <div className="w-full md:w-3/4 float-right flex">
            <input
              type="text"
              placeholder="search laptop"
              ref={searchRef}
              className="p-2 w-full text-black outline-none rounded-md text-sm rounded-r-none"
            />
            <span className="flex items-center justify-center bg-orange-500 text-white rounded-r-md py-1 px-4 cursor-pointer">
              <SearchIcon w={20} h={20} />
            </span>
          </div>
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
