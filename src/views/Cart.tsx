import ListProducts from "@/components/cart/ListProducts";
const CartPage = () => {
  return (
    <div className="lg:min-h-[670px]">
      <section className="max-w-7xl m-auto gap-4 bg-white rounded-lg my-8 mx-4 md:mx-auto w-full">
        <ListProducts />
      </section>
    </div>
  );
};

export default CartPage;
