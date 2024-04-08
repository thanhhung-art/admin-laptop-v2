
const SliderPlaceholder = () => {
  return (
    <section className="max-w-7xl m-auto bg-white rounded-2xl shadow-md py-8 px-8 flex gap-8">
      <div className="w-full md:w-1/2 h-[402px] bg-slate-200 rounded-lg animate-pulse"></div>
      <div className="w-full md:w-1/2 h-[402px] rounded-lg flex flex-col gap-3 justify-center animate-pulse">
        <div className="w-full h-6 bg-slate-200 rounded"></div>
        <div className="w-full h-6 bg-slate-200 rounded"></div>
        <div className="w-full h-6 bg-slate-200 rounded"></div>
        <div className="w-full h-6 bg-slate-200 rounded"></div>
        <div className="w-full h-6 bg-slate-200 rounded"></div>
        <div className="w-full h-6 bg-slate-200 rounded"></div>
      </div>
    </section>
  )
}

export default SliderPlaceholder