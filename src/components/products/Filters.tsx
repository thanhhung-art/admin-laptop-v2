"use client";

import { useRouter, useSearchParams } from "next/navigation";

const brands = [
  "all",
  "macbook",
  "asus",
  "dell",
  "hp",
  "lenovo",
  "acer",
  "msi",
  "gigabyte",
  "microsoft",
];

const categories = [
  "all",
  "gaming",
  "office/study",
  "graphic",
  "thin/light",
  "4k",
  "2k",
  "oled",
  "amd",
  "intel",
];

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandParam = searchParams.get("brand");
  const categoryParam = searchParams.get("category");

  const handleSetFilter1 = ({
    brand,
    category,
  }: {
    brand?: string;
    category?: string;
  }) => {
    let queryParams: string[] = [];

    if (brand) {
      if (categoryParam)
        queryParams.push(`category=${encodeURIComponent(categoryParam)}`);
      if (brand !== "all") {
        queryParams.push(`brand=${brand}`);
        router.replace(`?${queryParams.join("&")}`);
        return;
      } else {
        router.replace(`?${queryParams.length > 0 ? queryParams.join() : ""}`);
        return;
      }
    }

    if (category) {
      if (brandParam)
        queryParams.push(`brand=${encodeURIComponent(brandParam)}`);
      if (category !== "all") {
        queryParams.push(`category=${category}`);
        router.replace(`?${queryParams.join("&")}`);
        return;
      } else {
        router.replace(`?${queryParams.length > 0 ? queryParams.join() : ""}`);
        return;
      }
    }
  };

  return (
    <section className="max-w-7xl m-auto my-2 bg-white rounded p-4">
      <div className="">
        <ul className="flex flex-wrap gap-2 md:gap-8 px-4 overflow-x-auto justify-between mb-4">
          {brands.map((tag) => (
            <li key={tag} onClick={() => handleSetFilter1({ brand: tag })}>
              <h4
                className={`text-sm text-gray-700 cursor-pointer px-4 ${
                  tag === brandParam || tag === "all"
                    ? "bg-gray-200"
                    : "bg-gray-100"
                } hover:bg-gray-200 active:bg-gray-300 rounded-full`}
              >
                {tag.toUpperCase()}
              </h4>
            </li>
          ))}
        </ul>

        <ul className="flex justify-between overflow-x-auto gap-2">
          {categories.map((e, i) => (
            <li key={i} className="">
              <h4
                className={`text-sm ${
                  e === categoryParam || e === "all"
                    ? "bg-gray-200"
                    : "bg-gray-100"
                } hover:bg-gray-200 active:bg-gray-300 cursor-pointer px-4 rounded-full text-gray-700`}
                onClick={() => handleSetFilter1({ category: e })}
              >
                {e.toUpperCase()}
              </h4>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Filters;
