"use client";

import StarIconEmpty from "@/icons/StarIconEmpty";
import { Fetch, getProduct } from "@/lib/axios";
import { uploadImage } from "@/lib/cloundinary/uploadImage";
import { IProductInCart } from "@/types/product";
import { IReview } from "@/types/reviews";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, createRef, useEffect, useRef, useState } from "react";

interface IProps {
  product: IProductInCart;
  sendData: boolean;
  usernameRef: string;
}

const ProductInReview = ({ product, sendData, usernameRef }: IProps) => {
  const [userRating, setUserRating] = useState(5);
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const imagesFiles = useRef<string[]>([]);
  const fileFilterd = useRef<File[]>([]);
  const reviewRef = createRef<HTMLTextAreaElement>();

  const { data, isLoading } = useQuery(["getProduct", product.productId], () =>
    getProduct(product.productId)
  );

  const addReviewMutation = useMutation({
    mutationFn: (formData: IReview) => {
      return Fetch.post("/reviews", formData);
    },
  });

  const handleUserRating = (value: number) => {
    setUserRating(value);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files?.length > 0) {
      fileFilterd.current = Array.from(files)
        .slice(0, 5)
        .filter((file) => {
          if (file.size < 900 * 1024 && file.type.includes("image"))
            return true;
          return false;
        });

      const newImages = fileFilterd.current.map((image) => {
        return URL.createObjectURL(image);
      });

      setSelectedImage(newImages);
    }
  };

  const handleSubmit = async (userReview: string) => {
    const urlPromises: Promise<string>[] = fileFilterd.current.map((image) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = async () => {
          const result = fileReader.result as string;
          try {
            resolve((await uploadImage(result)).secure_url);
          } catch (err) {
            reject(err);
          }
        };
        fileReader.onerror = () => "Failed to load file!";
        fileReader.readAsDataURL(image);
      });
    });

    await Promise.all(urlPromises).then((urls) => {
      imagesFiles.current = urls;
    });

    const formData: IReview = {
      username: usernameRef || "",
      productId: product.productId,
      rating: userRating,
    };

    if (userReview) {
      formData.review = userReview;
    }

    if (imagesFiles.current.length > 0) {
      formData.images = imagesFiles.current;
    }

    addReviewMutation.mutate(formData);
  };

  useEffect(() => {
    if (sendData && reviewRef.current) {
      handleSubmit(reviewRef.current.value);
      imagesFiles.current = [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendData, reviewRef.current]);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <div className="flex gap-4">
        <div className="relative w-24 h-14 flex-shrink-0">
          {data && <Image src={data?.data.img} fill alt="product image" />}
        </div>
        <h4 className="text-sm">{data?.data.name}</h4>
      </div>
      <div className="flex gap-2 mt-4 mb-3">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div
            key={rating}
            className="cursor-pointer"
            onClick={() => handleUserRating(rating)}
          >
            <StarIconEmpty
              color={userRating + 1 > rating ? "#ff9238" : "none"}
            />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <p className="text-[10px] text-gray-500 mb-1">
          *select image smaller than 1MB
        </p>
        <div className=" w-min flex gap-2">
          <label htmlFor="get_image">
            <div className="border border-dashed border-blue-500 w-16 h-16 flex justify-center items-center cursor-pointer rounded">
              <p className="text-[10px] text-gray-400">add image</p>
              <input
                type="file"
                hidden
                id="get_image"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                max="1MB"
              />
            </div>
          </label>
          {selectedImage.length > 0 &&
            selectedImage.map((image, i) => (
              <div key={i} className="relative h-16 w-16">
                <Image src={image} fill alt="image" className="rounded" />
              </div>
            ))}
        </div>
      </div>
      <div>
        <textarea
          title="product review"
          name="review product"
          placeholder="review..."
          className="border border-gray-400 w-full p-2 h-20 outline-none"
          ref={reviewRef}
        ></textarea>
      </div>
    </div>
  );
};

export default ProductInReview;
