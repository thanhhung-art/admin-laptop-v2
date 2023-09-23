import StarIcon from "@/icons/StarIcon";
import Image from "next/image";
interface IProps {
  image: string;
  name: string;
  price: number;
  rating: number;
}
const QuickView = ({ image, name, price, rating }: IProps) => {
  return (
    <section className="max-w-7xl m-auto my-4 mb-2 md:mb-4 flex flex-col md:flex-row gap-2 md:gap-4">
      <div className="p-4 bg-white rounded-md">
        {image && <Image src={image} width={400} height={280} alt="laptop" priority />}
      </div>
      <div className="bg-white flex-1 flex flex-col gap-2 rounded-md p-4">
        <h2 className="max-w-[700px] text-lg md:text-2xl">{name}</h2>

        <div className="flex gap-2 items-center">
          <h3>5.0</h3>
          <ul className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i} className="ml-1">
                <StarIcon w={16} h={16} />
              </li>
            ))}
          </ul>
        </div>

        <h2 className="text-xl flex-1">
          <span className="text-sm">$</span>
          {price}
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
