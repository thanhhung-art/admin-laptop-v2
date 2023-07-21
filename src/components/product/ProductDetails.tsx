const ProductDetails = () => {
  const tags = [
    "Brand",
    "Model Name",
    "Screen Size",
    "Color",
    "Hard Disk Size",
    "Cpu",
    "Gpu",
    "Ram",
    "Size",
    "Operating System",
  ];
  return (
    <section className="bg-white rounded-md p-4 mb-auto">
      <table>
        {tags.map((i) => (
          <tr key={i}>
            <td className="pr-4 text-sm">{i}</td>
            <td className="text-sm">lorem dsfsdf</td>
          </tr>
        ))}
      </table>
    </section>
  );
};

export default ProductDetails;
