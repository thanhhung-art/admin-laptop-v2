import Slider from "@/components/home/Slider";
import Navbar from "@/components/navbar/Navbar";
import ProductsByFilter from "@/components/home/ProductsByFilter";
import Footer from "@/components/footer/Footer";
import ShortCuts from "@/components/home/Shorcuts";
import { GetTopRatingProducts, GetTopSellProducts } from "@/utils/keys";

export default function Home() {

  return (
    <main className="bg-sky-500">
      <Navbar />
      <div className="px-4">
        <header className="py-8 my-4 md:my-0 md:py-16">
          <Slider />
        </header>
        <ShortCuts />
        <ProductsByFilter
          componentName="Top sale items"
          queryKey={GetTopSellProducts}
        />
        <ProductsByFilter
          componentName="Top rating products"
          queryKey={GetTopRatingProducts}
        />
      </div>
      <Footer />
    </main>
  );
}
