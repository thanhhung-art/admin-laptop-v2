import Slider from "@/components/home/Slider";
import Navbar from "@/components/navbar/Navbar";
import ProductsLayout from "@/components/home/ProductsLayout";
import Footer from "@/components/footer/Footer";
import ShortCuts from "@/components/home/Shorcuts";

export default function Home() {

  return (
    <main className="bg-sky-500">
      <Navbar />
      <div className="px-4">
        <header className="py-8 my-4 md:my-0 md:py-16">
          <Slider />
        </header>
        {/* <Labels /> */}
        <ShortCuts />
        <ProductsLayout componentName="Top sale items" />
        <ProductsLayout componentName="Top rating products" />
      </div>
      <Footer />
    </main>
  );
}
