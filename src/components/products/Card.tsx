import Laptop from "@/images/Lg_ultraPc.jpg";
import Image from "next/image";
import AddToCartIcon from "@/icons/AddToCartIcon";
import Link from "next/link";
import StarHalfIcon from "@/icons/StarHalfIcon";
import StarIcon from "@/icons/StarIcon";

const Card = ({ indexProduct }: { indexProduct: number }) => {
  return (
    <section className="bg-white rounded-md overflow-hidden">
      <div className="px-4 py-8 transform hover:scale-105">
        <Link href={`/product/${indexProduct}`}>
          <div className="flex justify-center">
            <Image src={Laptop} alt="laptop" width={280} />
          </div>
          <h4 className="max-w-[300px] text-center text-md font-semibold mt-4">
            LG UltraPC 16U70R-K.AAS7U1 Thin and Lightweight Laptop,Gray
          </h4>
        </Link>
        <ul className="flex my-2">
          {[1, 2, 3, 4, 5].map((e) => (
            <li key={e} className="mr-1">
              <StarIcon />
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <h3>$329.99</h3>
          <span className="cursor-pointer">
            <AddToCartIcon w={25} h={25} />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Card;
