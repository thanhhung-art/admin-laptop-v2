import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ProductDetails from "@/components/product/ProductDetails";
import QuickView from "@/components/product/QuickView";
import Reviews from "@/components/product/Reviews";

const ProductPage = () => {
  return (
    <>
      <Navbar />
      <QuickView />
      <div className="flex gap-4 max-w-7xl m-auto mb-8">
        <Reviews />
        <ProductDetails />
      </div>
      <Footer />
    </>
  )
}

export default ProductPage