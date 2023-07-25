"use client";
import Link from "next/link";
import React, { useRef } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartIcon from "@/icons/CartIcon";
import SearchIcon from "@/icons/SearchIcon";

const Navbar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
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
          <div>
            <Link href="/cart"><CartIcon w={20} h={20} /></Link>
          </div>
        </li>

        <li className="">
          <div>
            <Link href="/profile">
              <div className="w-8 h-8 rounded-full bg-black"></div>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
