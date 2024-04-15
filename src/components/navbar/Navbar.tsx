import Link from "next/link";
import Search from "./Search";
import Cart from "./Cart";

const Navbar = () => {
  return (
    <nav className="p-4 md:p-5 bg-sky-700 text-white w-full">
      <ul className="flex justify-between items-center gap-2 flex-wrap md:gap-8 lg:gap-16">
        <li className="pr-16 md:pr-0">
          <Link href="/">home</Link>
        </li>

        <li className="flex-1 relative min-w-full order-last md:order-none md:min-w-fit">
          <Search />
        </li>

        <li>
          <Link href="/products">All Laptop</Link>
        </li>

        <li>
          <Link href="/cart">
            <Cart />
          </Link>
        </li>

        <li className="">
          <div>
            <Link href="/orders">
              <p>orders</p>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
