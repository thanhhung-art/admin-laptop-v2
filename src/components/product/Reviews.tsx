"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/lib/axios";
import { Fragment, useMemo } from "react";
import StarIconEmpty from "@/icons/StarIconEmpty";
import { GetReviews } from "@/utils/keys";
import Rating from "../Rating";

interface IProps {
  productId: string;
}

const Reviews = ({ productId }: IProps) => {
  const { data } = useQuery([GetReviews], () => getReviews(productId));

  return (
    <section className="bg-white rounded-md p-4 flex-1 order-2 md:order-none border">
      <div className="flex gap-2 items-center">
        <h2 className="text-xl">Reviews</h2>
        {data && <h4>({data.data.length})</h4>}
      </div>
      <ul className="mt-4">
        {data &&
          data.data.map((review) => (
            <Fragment key={review._id}>
              <Child
                message={review.review}
                images={review.images}
                reviewDate={review.createdAt}
                userRating={review.rating}
              />
            </Fragment>
          ))}
      </ul>
    </section>
  );
};

function Child({
  message,
  images,
  reviewDate,
  userRating,
}: {
  message?: string;
  images?: string[];
  reviewDate: string;
  userRating: number;
}) {
  const dateCreated = useMemo(() => {
    const dateObj = new Date(reviewDate);
    const dateReformated = dateObj.toLocaleDateString(navigator.language, {
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
    });
    return `${dateReformated}`;
  }, [reviewDate]);

  return (
    <li className="flex bg-slate-50 p-4 rounded">
      <div>
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold">John Doe</h3>
          <ul className="flex">
            <Rating readonly value={userRating} />
          </ul>
        </div>

        {message !== "" && <p className="text-sm my-2">{message}</p>}

        {images && images.length > 0 && (
          <div className="flex gap-1">
            {images.map((image, i) => (
              <div key={i} className="relative w-16 h-16 mb-1">
                <Image
                  src={image}
                  alt="image review"
                  fill
                  className="rounded"
                />
              </div>
            ))}
          </div>
        )}

        <p className="text-[12px] text-gray-600">Reviewed {dateCreated}</p>
      </div>
    </li>
  );
}

export default Reviews;
