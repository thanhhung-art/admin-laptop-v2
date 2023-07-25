import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Brands from "@/components/products/Brands";
import Filters from "@/components/products/Filters";
import Products from "@/components/products/Products";

const ProductsPage = () => {
  return (
    <div className="bg-sky-500">
      <Navbar />
      <main className="px-4 md:p-0">
        <Brands />
        <Filters />
        <Products />
        <div className="flex justify-center my-4 md:mb-16">
          <button className="px-2 py-1 rounded-full bg-white text-gray-700 text-sm transform active:scale-x-95">show more</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
