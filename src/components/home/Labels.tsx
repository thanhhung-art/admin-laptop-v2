import React from "react";
import Image from "next/image";
import GamingIcon from "@/icons/games.png";
import OfficeIcon from "@/icons/working-with-laptop.png";
import GraphicsIcon from "@/icons/graphic-design.png";
import StudyIcon from "@/icons/graduation-hat.png";

const Labels = () => {
  return (
    <section className="max-w-7xl m-auto py-16 flex justify-between">
      <div className="h-44 w-64 bg-white rounded-md flex flex-col gap-2 items-center justify-center">
        <div className="p-4 rounded-full bg-gray-300">
          <Image src={GamingIcon} alt="gaming" width={60} height={20} />
        </div>
        <h3>Gamming</h3>
      </div>
      <div className="h-44 w-64 bg-white rounded-md flex flex-col gap-2 items-center justify-center">
        <div className="p-4 rounded-full bg-gray-300">
          <Image src={OfficeIcon} alt="Office" width={60} height={20} />
        </div>
        <h3>Office</h3>
      </div>
      <div className="h-44 w-64 bg-white rounded-md flex flex-col gap-2 items-center justify-center">
        <div className="p-4 rounded-full bg-gray-300">
          <Image src={GraphicsIcon} alt="Graphics" width={60} height={20} />
        </div>
        <h3>Graphics</h3>
      </div>
      <div className="h-44 w-64 bg-white rounded-md flex flex-col gap-2 items-center justify-center">
        <div className="p-4 rounded-full bg-gray-300">
          <Image src={StudyIcon} alt="Study" width={60} height={20} />
        </div>
        <h3>Study</h3>
      </div>
    </section>
  );
};

export default Labels;
