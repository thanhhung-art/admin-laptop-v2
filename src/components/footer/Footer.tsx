const Footer = () => {
  return (
    <footer className="bg-sky-900 w-full">
      <section className="max-w-7xl m-auto py-20 text-gray-400 flex justify-between">
        <div>
          <h3 className="pb-4 font-semibold text-lg text-blue-400">ABOUT US</h3>
          <h4 className="pb-2 font-semibold">SHOP LAPTOP</h4>
          <p className="max-w-sm text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Exercitationem corporis at dolore quisquam facere commodi ipsam
            nobis doloribus pariatur distinctio, debitis laudantium ratione
            rerum perferendis incidunt ipsum a beatae nesciunt!
          </p>
        </div>

        <div>
          <h3 className="pb-4 font-semibold text-lg text-blue-400">CONTACT INFO</h3>
          <div className="pb-2">
            <h4 className="font-semibold text-green-600">ADDRESS:</h4>
            <p className="text-sm">123 street name, city, viet nam.</p>
          </div>
          <div className="pb-2">
            <h4 className="font-semibold text-green-600">PHONE:</h4>
            <p className="text-sm">+84 123 456 789</p>
          </div>
          <div className="pb-2">
            <h4 className="font-semibold text-green-600">EMAIL:</h4>
            <p className="text-sm">demo@example.com</p>
          </div>
          <div className="pb-2">
            <h4 className="font-semibold text-green-600">WORK DAYS/HOURS:</h4>
            <p className="text-sm">MON - SUN / 9.00 AM - 8.00 PM</p>
          </div>
        </div>

        <div>
          <h3 className="pb-4 font-semibold text-lg text-blue-400">CUSTOM SERVICE</h3>
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
                <p className="text-sm pb-2">{e}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="pb-4 font-semibold text-lg text-blue-400">POPULAR TAGS</h3>
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
      <section className="max-w-7xl m-auto flex justify-between text-gray-400 items-end">
        <p className="text-sm">© Laptop eCommerce. © 2021. All Rights Reserved</p>
        <div className="flex gap-4">
          <p className="text-xl">VISA</p>
          <p className="text-xl">STRIPE</p>
          <p className="text-xl">PAYPAL</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
