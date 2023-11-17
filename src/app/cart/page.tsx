import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import CartPage from "@/views/Cart";

const page = () => {
  return (
    <>
      <Navbar />
      <CartPage />;
      <Footer />
    </>
  );
};

export default page;
