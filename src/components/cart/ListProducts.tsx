'use client'
import React from "react";
import Laptop from "@/images/71+1lOl1Y1L._AC_SX466_.jpg";
import Image from "next/image";
import PlusIcon from "@/icons/PlusIcon";
import Link from "next/link";
import MinusIcon from "@/icons/MinusIcon";
import useMobile from "@/hooks/isMobile";
const name =
  "Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6 inch Full HD IPS Display | AMD Ryzen 3 7314U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Mode";


const ListProducts = () => {
  return (
    <div>
      <ul className="p-4 flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <li key={i} className="shadow-md p-2 rounded">
            <Child />
          </li>
        ))}
        <li className="flex justify-end gap-4 items-center">
          <h2 className="font-semibold text-lg">Total: $8991</h2>
          <Link href="/checkout">
            <button className="bg-blue-500 px-4 py-1 rounded text-white active:scale-95">checkout now</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

function Child() {
  const { isMobile } = useMobile();
  return (
    <div className="flex gap-4">
      <div>
        <Image src={Laptop} alt="laptop" height={180} />
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm">{isMobile ? name.slice(0, 130) + " ...": name}</h3>
        <p className="text-[12px] md:mt-1">product quantity: 3</p>
        <h3 className="text-[12px] flex-1 md:mt-1">Price: $999</h3>
        <div className="flex justify-between items-center mt-2 md:mt-0">
          <div>
            <button className="border border-blue-500 rounded px-4 md:px-8 active:scale-95">
              <PlusIcon w={14} h={14} />
            </button>
            <button className="border border-blue-500 rounded px-4 md:px-8 ml-2 active:scale-95">
              <MinusIcon w={14} h={14} />
            </button>
          </div>
          <div>
            <h3 className="text-md font-semibold">cost: $2997</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProducts;
