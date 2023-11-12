const ProductImagePlacehoder = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          <div className="placeholder w-56 h-40 bg-slate-300 rounded"></div>
          <div className="flex-1 flex flex-col gap-2 h-40">
            <div className="placeholder w-full bg-slate-300 rounded h-4"></div>
            <div className="placeholder w-full bg-slate-300 rounded h-4"></div>
            <div className="placeholder w-full bg-slate-300 rounded h-4"></div>
            <div className="flex-1"></div>
            <div className="placeholder w-full bg-slate-300 rounded h-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductImagePlacehoder;
