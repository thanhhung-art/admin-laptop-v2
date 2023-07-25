const Footer = () => {
  return (
    <footer className="bg-sky-900 w-full px-4">
      <section className="max-w-7xl m-auto py-4 md:py-20 text-gray-400 flex flex-col gap-4 justify-between md:flex-row md:flex-wrap md:gap-8 lg:gap-0">
        <div className="md:w-[calc((100%/2)-2rem)] lg:w-fit">
          <h3 className="pb-2 md:pb-4 font-semibold text-lg text-blue-400">ABOUT US</h3>
          <h4 className="md:pb-2 font-semibold">SHOP LAPTOP</h4>
          <p className="max-w-sm text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Exercitationem corporis at dolore quisquam facere commodi ipsam
            nobis doloribus pariatur distinctio, debitis laudantium ratione
            rerum perferendis incidunt ipsum a beatae nesciunt!
          </p>
        </div>

        <div className="md:order-3 lg:order-none md:w-[calc((100%/2)-2rem)] lg:w-fit">
          <h3 className="pb-2 md:pb-4 font-semibold text-lg text-blue-400">CONTACT INFO</h3>
          <div className="md:pb-2">
            <h4 className="font-semibold text-green-600">ADDRESS:</h4>
            <p className="text-sm">123 street name, city, viet nam.</p>
          </div>
          <div className="md:pb-2">
            <h4 className="font-semibold text-green-600">PHONE:</h4>
            <p className="text-sm">+84 123 456 789</p>
          </div>
          <div className="md:pb-2">
            <h4 className="font-semibold text-green-600">EMAIL:</h4>
            <p className="text-sm">demo@example.com</p>
          </div>
          <div className="md:pb-2">
            <h4 className="font-semibold text-green-600">WORK DAYS/HOURS:</h4>
            <p className="text-sm">MON - SUN / 9.00 AM - 8.00 PM</p>
          </div>
        </div>

        <div className="md:order-4 lg:order-none md:w-[calc((100%/2)-2rem)] lg:w-fit">
          <h3 className="pb-2 md:pb-4 font-semibold text-lg text-blue-400">CUSTOM SERVICE</h3>
          <ul>
            {[
              "Help & FAQs",
              "Order Tracking",
              "Shipping & Delivery",
              "Order History",
              "Advanced Search",
              "My Account",
              "Careers",
              "About us",
              "Corporate Sales",
              "Privacy",
            ].map((e, i) => (
              <li key={i}>
                <p className="text-sm md:pb-2">{e}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:order-2 lg:order-none md:w-[calc((100%/2)-2rem)] lg:w-fit">
          <h3 className="pb-2 md:pb-4 font-semibold text-lg text-blue-400 lg:text-left">POPULAR TAGS</h3>
          <ul className="flex gap-2 flex-wrap max-w-[300px]">
            {[
              "apple",
              "lenovo",
              "acer",
              "asus",
              "hp",
              "dell",
              "13 inch",
              "battery long",
            ].map((tag) => (
              <li key={tag}>
                <p className="text-sm border-slate-400 border p-1 cursor-pointer hover:border-slate-600 rounded">
                  {tag}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="max-w-7xl m-auto flex justify-between text-gray-400 items-end flex-wrap">
        <p className="text-sm">© Laptop eCommerce. © 2021. All Rights Reserved</p>
        <div className="flex gap-4 m-auto">
          <p className="text-xl">VISA</p>
          <p className="text-xl">STRIPE</p>
          <p className="text-xl">PAYPAL</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
