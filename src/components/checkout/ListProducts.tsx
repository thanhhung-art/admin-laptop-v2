'use client'
import React, { createRef, useRef } from "react";
import Laptop from "@/images/71+1lOl1Y1L._AC_SX466_.jpg";
import Image from "next/image";

const name =
  "Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6 inch Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Mode";

const ListProducts = () => {
  const containerRef = createRef<HTMLDivElement>()
  return (
    <div className="shadow p-2 flex flex-col" ref={containerRef}>
      <ul className={`overflow-auto max-h-[628px] flex-1`}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <li
            className="flex gap-2 shadow rounded px-2 py-4 items-center"
            key={i}
          >
            <div>
              <Image src={Laptop} alt="laptop" width={40} />
            </div>
            <h5 className="text-[12px]">{name.slice(0, 40)}...</h5>
            <h5>x1</h5>
          </li>
        ))}
      </ul>
      <h2 className="text-end text-lg font-semibold">Total Cost: $999</h2>
    </div>
  );
};

export default ListProducts;
