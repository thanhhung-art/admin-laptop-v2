import ListProducts from "@/components/cart/ListProducts";
import Footer from "@/components/footer/Footer";

const CartPage = () => {
  return (
    <div className="lg:h-screen lg:flex lg:flex-col">
      <section className="lg:flex-1 max-w-7xl m-auto flex gap-4 bg-white rounded-md my-8 mx-4 md:mx-auto">
        <ListProducts />
      </section>
      <Footer />
    </div>
  );
};

export default CartPage;
