import Link from "next/link";

const shortcuts = [
  ["macbook", "acer", "asus", "lenovo", "dell", "hp", "msi"],
  [
    "gigabyte",
    "microsoft",
    "gaming",
    "office, study",
    "thin, light",
    "graphic",
    "coding",
  ],
];

const ShortCuts = () => {

  return (
    <section className=" max-w-7xl m-auto bg-white rounded-lg p-4 md:p-8 mb-8 md:mb-16">
      <div className="overflow-auto">
        <table className="w-full border">
          <tbody>
            <tr>
              {shortcuts[0].map((shortcut) => (
                <td
                  className="p-4 md:p-12 cursor-pointer border text-center hover:bg-slate-200 font-semibold"
                  key={shortcut}
                >
                  {shortcut}
                </td>
              ))}
            </tr>
            <tr>
              {shortcuts[1].map((shortcut) => (
                <td className="p-4 md:p-12 border hover:bg-slate-200 font-semibold" key={shortcut}>
                  <Link href={`/products?filter=${shortcut}`}>{shortcut}</Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ShortCuts;
