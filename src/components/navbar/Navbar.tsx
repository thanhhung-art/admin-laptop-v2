"use client";
import Link from "next/link";
import React, { useRef } from "react";
import SearchIcon from '@/icons/search-interface-symbol.png'
import Image from "next/image";

const Navbar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  return (
    <nav className="p-5 bg-sky-700 text-white">
      <ul className="flex justify-between items-center gap-16">
        <li className="">
          <Link href="/">home</Link>
        </li>

        <li className="flex-1 relative">
          <div className="w-3/4 float-right flex">
            <input
              type="text"
              placeholder="search laptop"
              ref={searchRef}
              className="p-2 w-full text-black outline-none rounded-md text-sm rounded-r-none"
            />
            <span className="flex items-center justify-center bg-orange-500 text-white rounded-r-md py-1 px-4 cursor-pointer">
              <Image src={SearchIcon} alt="search" width={17} height={17} />
            </span>
          </div>
        </li>

        <li className="">
          <Link href="/products">All Laptop</Link>
        </li>

        <li>
          <div>
            <Link href="/cart">cart</Link>
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
