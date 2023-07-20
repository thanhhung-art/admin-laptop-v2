import Footer from "@/components/footer/Footer"
import Navbar from "@/components/navbar/Navbar"
import Brands from "@/components/products/Brands"
import Filters from "@/components/products/Filters"
import Products from "@/components/products/Products"

const ProductPage = () => {
  return (
    <main className="bg-blue-500">
      <Navbar />
      <Brands />
      <Filters />
      <Products />
      <Footer />
    </main>
  )
}

export default ProductPage