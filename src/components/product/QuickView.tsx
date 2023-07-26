import Laptop from "@/images/71+1lOl1Y1L._AC_SX466_.jpg";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";

const QuickView = () => {
  return (
    <section className="max-w-7xl m-auto my-4 mb-2 md:mb-4 flex flex-col md:flex-row gap-2 md:gap-4">
      <div className="p-4 bg-white rounded-md">
        <Image src={Laptop} alt="laptop" />
      </div>
      <div className="bg-white flex-1 flex flex-col gap-2 rounded-md p-4">
        <h2 className="max-w-[700px] text-lg md:text-2xl">
          Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6 inch Full HD IPS
          Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics
          | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Mode
        </h2>

        <div className="flex gap-2 items-center">
          <h3>5.0</h3>
          <ul className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i}>
                <StarIcon
                  fontSize="small"
                  sx={{ color: "rgb(240, 191, 76)" }}
                />
              </li>
            ))}
          </ul>
        </div>

        <h2 className="text-xl flex-1">
          <span className="text-sm">$</span>329.99
        </h2>

        <div className="">
          <button className="block w-full border-2 border-blue-500 rounded-md py-2 transform active:scale-95 text-blue-500">
            ADD TO CARD
          </button>
          <button className="block w-full bg-blue-500 mt-2 rounded-md py-2 transform active:scale-95 text-white">
            BUY NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickView;
