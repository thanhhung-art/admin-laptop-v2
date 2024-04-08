import React from 'react'

const CardPlaceholder = () => {
  return (
    <div className='w-[308px] h-[466px] bg-white rounded-lg p-5'>
      <div className='w-[268px] h-[200px] bg-slate-200 rounded-lg animate-pulse'></div>
      <div className='mt-5 flex flex-col gap-2 animate-pulse'>
        <div className=' h-4 w-full bg-slate-200 rounded'></div>
        <div className=' h-4 w-full bg-slate-200 rounded'></div>
        <div className=' h-4 w-full bg-slate-200 rounded'></div>
        <div className=' h-4 w-full bg-slate-200 rounded'></div>
        <div className=' h-4 w-full bg-slate-200 rounded'></div>
        <div className=' h-4 w-full bg-slate-200 rounded'></div>
      </div>
      <div className='mt-8 flex justify-between animate-pulse'>
        <div className='h-8 w-24 bg-slate-200 rounded'></div>
        <div className='h-8 w-24 bg-slate-200 rounded'></div>
      </div>
    </div>
  )
}

export default CardPlaceholder