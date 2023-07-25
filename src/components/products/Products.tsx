import Card from "./Card";

const Products = () => {
  return (
    <ul className="max-w-7xl m-auto grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 justify-between mt-4">
      {Array(20)
        .fill(1)
        .map((e, i) => (
          <li key={i}>
            <Card indexProduct={i} />
          </li>
        ))}
    </ul>
  );
};

export default Products;
