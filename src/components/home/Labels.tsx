import React from "react";
import GamingIcon from "@/icons/GamingIcon";
import StudyIcon from "@/icons/StudyIcon";
import OfficeIcon from "@/icons/OfficeIcon";
import GraphicsIcon from "@/icons/GraphicsIcon";


const Labels = () => {
  return (
    <section className="max-w-7xl m-auto pb-8 pt-0 mb-8 md:mb-16 md:pt-8 flex justify-between md:justify-center flex-wrap gap-2 lg:gap-4 lg:justify-between">
      <div className="h-44 w-[calc(50%-0.25rem)] md:w-fit md:px-24 lg:w-64 bg-white rounded-md flex flex-col gap-2 items-center justify-center">
        <div className="p-4 rounded-full bg-gray-300">
          <GamingIcon w={60} h={60} />
        </div>
        <h3>Gamming</h3>
      </div>
      <div className="h-44 w-[calc(50%-0.25rem)] md:w-fit md:px-24 lg:w-64 bg-white rounded-md flex flex-col gap-2 items-center justify-center">
        <div className="p-4 rounded-full bg-gray-300">
          <OfficeIcon />
        </div>
        <h3>Office</h3>
      </div>
      <div className="h-44 w-[calc(50%-0.25rem)] md:w-fit md:px-24 lg:w-64 bg-white rounded-md flex flex-col gap-2 items-center justify-center">
        <div className="p-4 rounded-full bg-gray-300">
          <GraphicsIcon />
        </div>
        <h3>Graphics</h3>
      </div>
      <div className="h-44 w-[calc(50%-0.25rem)] md:w-fit md:px-24 lg:w-64 bg-white rounded-md flex flex-col gap-2 items-center justify-center">
        <div className="p-4 rounded-full bg-gray-300">
          <StudyIcon />
        </div>
        <h3>Study</h3>
      </div>
    </section>
  );
};

export default Labels;
