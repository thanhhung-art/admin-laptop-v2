import { IProductInCart } from "@/types/product";
import ReviewForm from "./ReviewForm";
import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetReviewsInOrder } from "@/utils/keys";
import { getReviewsInOrder } from "@/lib/axios";
import { IReview, IReviewFull } from "@/types/reviews";

interface IProps {
  handleCloseModal: () => void;
  products: IProductInCart[];
  username: string;
  handleSendData: () => void;
  sendData: boolean;
  orderId: string;
  customerPhone: string;
  isReviewed: boolean;
}

const Modal = ({
  handleCloseModal,
  products,
  username,
  handleSendData,
  sendData,
  orderId,
  customerPhone,
  isReviewed,
}: IProps) => {
  const { data, isLoading } = useQuery(
    [GetReviewsInOrder, orderId],
    () => getReviewsInOrder(orderId),
    {
      enabled: !!orderId,
    }
  );

  if (isLoading) return <div>loading</div>;

  console.log(data);

  return (
    <>
      <section className="flex justify-center items-center">
        <div className="max-w-3xl bg-white rounded-lg p-8">
          <div className="mb-4 flex justify-end items-center">
            <button
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-lg text-white px-3 py-1"
              onClick={handleCloseModal}
            >
              close
            </button>
          </div>
          {products.map((p) => {
            let review: IReviewFull | undefined;
            if (isReviewed && data) {
              review = data.data.find((r) => r.productId === p.productId);
            }
            return (
              <Fragment key={p.productId}>
                <ReviewForm
                  product={p}
                  sendData={sendData}
                  username={username}
                  orderId={orderId}
                  customerPhone={customerPhone}
                  isReviewed={isReviewed}
                  review={review?.review || ""}
                  rating={review?.rating || 5}
                  images={review?.images || []}
                  reviewId={review?._id || ""}
                />
              </Fragment>
            );
          })}
        </div>
      </section>
      <button
        className="mx-8 mb-4 float-right bg-blue-500 px-3 py-1 rounded-lg text-white hover:bg-blue-600 active:bg-blue-700"
        onClick={handleSendData}
      >
        send
      </button>
    </>
  );
};

export default Modal;
