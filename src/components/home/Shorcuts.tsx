const arr = [
  "macbook",
  "acer",
  "asus",
  "lenovo",
  "dell",
  "hp",
  "msi",
  "gigabyte",
  "microsoft",
  "gaming",
  "office, study",
  "thin, light",
  "graphic",
  "coding",
];

const ShortCuts = () => {
  return (
    <section className=" max-w-7xl m-auto bg-white rounded-lg p-8 mb-8">
      <div className="flex justify-between gap-12 flex-wrap">
        {arr.map((e, i) => (
          <div key={i} className={` ${e === "graphic" && ""}`}>
            <h3 className="h-32 w-32 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 box-shadow p-2 flex justify-center items-center font-semibold">
              {e}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShortCuts;
