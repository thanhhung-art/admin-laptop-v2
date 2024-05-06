import Link from "next/link";

const brands = [
  "macbook",
  "acer",
  "asus",
  "lenovo",
  "dell",
  "hp",
  "msi",
  "gigabyte",
  "microsoft",
];

const categories = [
  "gaming",
  "office, study",
  "thin, light",
  "graphic",
  "coding",
];

const ShortCuts = () => {
  return (
    <section className=" max-w-7xl m-auto bg-white rounded-lg p-4 md:p-8 mb-8 md:mb-16">
      <div className="overflow-auto">
        <div className=" grid grid-cols-7 items-center justify-center overflow-auto] min-w-[840px] md:min-w-[1200px]">
          {[...brands, ...categories].map((e) => {
            let param = "";
            if (brands.includes(e)) {
              param = `?brand=${e}`;
            } else if (categories.includes(e)) {
              param = `?category=${e}`;
            }
            return (
              <div
                className="border cursor-pointer hover:bg-slate-200 active:bg-slate-300"
                key={e}
              >
                <Link href={`/products${param}`}>
                  <p className="text-center font-semibold text-sm md:text-base p-4 md:p-6">{e}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShortCuts;
