"use client";
import { useRef, useState } from "react";
import SearchIcon from "@/icons/SearchIcon";
import { getSearch } from "@/lib/axios";
import { IProductInSearch } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Search = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceSearchRef = useRef<NodeJS.Timeout>();
  const [searchResults, setSearchResults] = useState<IProductInSearch[]>([]);
  const [openResults, setOpenResults] = useState(false);
  const router = useRouter();

  const handleSearching = async () => {
    if (searchRef.current && searchRef.current.value) {
      clearTimeout(debounceSearchRef.current);

      debounceSearchRef.current = setTimeout(async () => {
        const result = await getSearch(searchRef.current?.value);
        setSearchResults(result.data);
        setOpenResults(true);
      }, 500);
    }
  };

  const handleGotoProductPage = (pid: string) =>
    router.push("/product/" + pid);

  return (
    <div className="w-full md:w-3/4 float-right flex relative">
      <input
        type="text"
        placeholder="search laptop"
        ref={searchRef}
        className="p-2 w-full text-black outline-none rounded-md text-sm rounded-r-none"
        onChange={handleSearching}
        onFocus={() => setOpenResults(true)}
        onBlur={() => setOpenResults(false)}
      />
      <span
        onClick={handleSearching}
        className="flex items-center justify-center bg-orange-500 text-white rounded-r-md py-1 px-4 cursor-pointer"
      >
        <SearchIcon w={20} h={20} />
      </span>
      {searchResults.length > 0 && openResults && (
        <ul className="absolute flex flex-col gap-2 z-50 top-full bg-white right-0 left-0 p-2 text-black rounded shadow-lg border-t-gray-200 border-t-2 z-50">
          {searchResults.map((p) => (
            <li
              key={p._id}
              className="flex gap-2 items-center cursor-pointer hover:bg-slate-200"
              onMouseDown={() => handleGotoProductPage(p._id)}
            >
              <div className="relative h-10 w-20 flex-shrink-0">
                <Image
                  src={p.img}
                  fill
                  style={{ objectFit: "contain" }}
                  alt="product image"
                  sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
                />
              </div>

              <p className="text-gray-600 text-sm">{p.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
