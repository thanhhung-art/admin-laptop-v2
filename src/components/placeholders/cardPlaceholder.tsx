import React from "react";

interface IProps {
  width: { sm?: string; md?: string };
}

const CardPlaceholder = ({ width }: IProps) => {
  return (
    <div
      className={`${width.sm} h-[380px] ${width.md} md:w-[308px] md:h-[466px] bg-white rounded-lg p-2 md:p-5`}
    >
      <div className="w-full h-36 md:w-[268px] md:h-[200px] bg-slate-200 rounded-lg animate-pulse"></div>
      <div className="mt-5 flex flex-col gap-2 animate-pulse">
        <div className=" h-4 w-full bg-slate-200 rounded"></div>
        <div className=" h-4 w-full bg-slate-200 rounded"></div>
        <div className=" h-4 w-full bg-slate-200 rounded"></div>
        <div className=" h-4 w-full bg-slate-200 rounded"></div>
        <div className=" h-4 w-full bg-slate-200 rounded"></div>
        <div className=" h-4 w-full bg-slate-200 rounded"></div>
      </div>
      <div className="mt-8 flex justify-between animate-pulse">
        <div className="h-8 w-24 bg-slate-200 rounded"></div>
        <div className="h-8 w-24 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
};

export default CardPlaceholder;
