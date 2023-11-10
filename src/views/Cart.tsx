import ListProducts from "@/components/cart/ListProducts";
import Footer from "@/components/footer/Footer";
import ProductImagePlacehoder from "@/components/placeholders/productImage";
import { Suspense } from "react";

const CartPage = () => {
  return (
    <div className="lg:h-screen lg:flex lg:flex-col">
      <section className="lg:flex-1 max-w-7xl m-auto gap-4 bg-white rounded-md my-8 mx-4 md:mx-auto w-full">
        <Suspense fallback={<ProductImagePlacehoder />}>
          <ListProducts />
        </Suspense>
      </section>
      <Footer />
    </div>
  );
};

export default CartPage;
