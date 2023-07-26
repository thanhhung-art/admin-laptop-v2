import ImageReview from "@/images/81nyJxacjEL._UC175,175_CACC,175,175_.jpg";
import Image from "next/image";
import StarIcon from "@/icons/StarIcon";

const Reviews = () => {
  return (
    <section className="bg-white rounded-md p-4 pb-0 flex-1 order-2 md:order-none">
      <h2 className="text-xl">Reviews</h2>
      <ul className="mt-4">
        <Child
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, hic
              saepe et quaerat ipsa cumque in numquam corporis dolores,
              perferendis a autem alias eaque aut fuga amet suscipit. Expedita,
              ex."
          image={true}
        />

        <Child />
      </ul>
    </section>
  );
};

function Child({ message, image }: { message?: string; image?: boolean }) {
  return (
    <li className="flex gap-2 md:gap-4 mb-4 md:mb-8">
      <div className="pt-2">
        <div className="h-8 w-8 rounded-full bg-gray-700"></div>
      </div>

      <div>
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold">John Doe</h3>
          <ul className="flex">
            {[1, 2, 3, 4, 5].map((e) => (
              <li key={e} className="ml-1">
                <StarIcon w={16} h={16} />
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[12px] text-gray-600">United States on June 15, 2023</p>
        <p className="text-gray-600 text-[12px] mb-2">Product quantity: good</p>

        {message !== "" && <p className="text-sm">{message}</p>}

        {image && (
          <div className="mt-2">
            <Image src={ImageReview} alt="image review" width={70} />
          </div>
        )}

        <div className="mt-2 md:mt-4 flex gap-8 items-center">
          <span>like</span>
          <button>reply</button>
        </div>
      </div>
    </li>
  );
}

export default Reviews;
