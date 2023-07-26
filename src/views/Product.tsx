import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ProductDetails from "@/components/product/ProductDetails";
import QuickView from "@/components/product/QuickView";
import Reviews from "@/components/product/Reviews";

const ProductPage = () => {
  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-0">
        <QuickView />
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 max-w-7xl m-auto mb-8">
          <Reviews />
          <ProductDetails />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
