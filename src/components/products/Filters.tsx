"use client";

import GamingIcon from "@/icons/GamingIcon";
import GraphicsIcon from "@/icons/GraphicsIcon";
import ThinLightIcon from "@/icons/ThinLightIcon";
import StudyIcon from "@/icons/StudyIcon";
import ArrowUpIcon from "@/icons/ArrowUpIcon";
import ArrowDownIcon from "@/icons/ArrowDownIcon";

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

const curatedCollections = [
  {
    name: "Gaming",
    icon: <GamingIcon w={20} h={20} />,
  },
  {
    name: "Office/study",
    icon: <StudyIcon w={20} h={20} />,
  },
  {
    name: "Graphic",
    icon: <GraphicsIcon w={20} h={20} />,
  },
  {
    name: "Thin/light",
    icon: <ThinLightIcon w={20} h={20} />,
  },
  {
    name: "Price up",
    icon: <ArrowUpIcon w={20} h={20} />,
  },
  {
    name: "Price down",
    icon: <ArrowDownIcon w={20} h={20} />,
  },
];

const Filters = ({
  handleSetFilter,
  handleSetPriceUpDown,
}: {
  handleSetFilter: ({
    brandOption,
    filterOption,
  }: {
    brandOption?: string;
    filterOption?: string;
  }) => void;
  handleSetPriceUpDown: (value: "up" | "down" | "none") => void;
}) => {
  return (
    <section className="max-w-7xl m-auto my-2 bg-white rounded p-4">
      <div className="">
        <ul className="flex gap-2 md:gap-8 px-4 overflow-x-auto mb-4 justify-between">
          {brands.map((tag) => (
            <li key={tag} onClick={() => handleSetFilter({ brandOption: tag })}>
              <h4 className="text-sm text-gray-700 cursor-pointer px-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full">
                {tag.toUpperCase()}
              </h4>
            </li>
          ))}
        </ul>

        <ul className="flex justify-between overflow-x-auto gap-2">
          {curatedCollections.map((e, i) => (
            <li
              key={i}
              className="flex gap-2 items-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full px-4 cursor-pointer"
              onClick={
                e.name === "Price up" || e.name === "Price down"
                  ? () =>
                      handleSetPriceUpDown(
                        e.name === "Price up" ? "up" : "down"
                      )
                  : () => handleSetFilter({ filterOption: e.name })
              }
            >
              {e.icon}
              <h4 className="text-sm">{e.name}</h4>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Filters;
