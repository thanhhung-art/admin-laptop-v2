const Brands = () => {
  const brands = [
    "all",
    "macbook",
    "asus",
    "dell",
    "hp",
    "lenovo",
    "acer",
    "msi",
    "gigabyte",
    "microsoft",
  ];       

  return (
    <section className="max-w-7xl bg-white m-auto my-2 flex justify-center rounded py-2">
      <ul className="flex gap-2 md:gap-8 px-4 overflow-x-auto">
        {brands.map((tag) => (
          <li key={tag}>
            <h4 className="text-sm text-gray-700 cursor-pointer px-4 bg-gray-100 rounded-full">
              {tag.toUpperCase()}
            </h4>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Brands;
