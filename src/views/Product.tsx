"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ProductDetails from "@/components/product/ProductDetails";
import QuickView from "@/components/product/QuickView";
import Reviews from "@/components/product/Reviews";
import { getProduct } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const ProductPage = ({ param }: { param: string }) => {
  const { data, isLoading } = useQuery(["getProduct", param], () =>
    getProduct(param)
  );

  if (isLoading) {
    return <div>is loading</div>;
  }

  if (!data) {
    return <div>error</div>;
  }

  return (
    <div>
      <div className="px-4 md:px-0">
        <QuickView
          image={data.data.img}
          name={data.data.name}
          price={data.data.price}
          rating={data.data.rating}
          _id={data.data._id}
        />
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 max-w-7xl m-auto mb-8">
          <Reviews />
          <ProductDetails
            brand={data.data.brand}
            color={data.data.color}
            configure={data.data.configure}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
