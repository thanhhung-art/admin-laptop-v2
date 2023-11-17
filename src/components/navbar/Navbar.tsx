import Link from "next/link";
import Search from "./Search";
import Cart from "./Cart";
import { cookies } from "next/headers";
import UserIcon from "@/icons/UserIcon";
import { Suspense } from "react";

const Navbar = () => {
  const cookieStore = cookies();

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
            {cookieStore.get("authtoken") ? (
              <Link href="/profile">
                <UserIcon w={50} h={50} />
              </Link>
            ) : (
              <Link href="/login">
                <p>sign in</p>
              </Link>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
