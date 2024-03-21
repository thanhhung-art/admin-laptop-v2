import StarIcon from "@/icons/StarIcon";
import StarIconEmpty from "@/icons/StarIconEmpty";
import { useState } from "react";

interface IProps {
  readonly?: boolean;
  value?: number;
}

const Rating = ({ readonly, value = 0 }: IProps) => {
  const [rating, setRating] = useState(value);

  const handleUserRating = (value: number) => {
    if (!readonly) setRating(value);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => handleUserRating(index)}
        >
          <StarIconEmpty color={rating + 1 > index ? "#ff9238" : "none"} />
        </div>
      ))}
    </div>
  );
};

export default Rating;
