import Navbar from '@/components/navbar/Navbar'
import Labels from '@/components/home/Labels'
import Slider from '@/components/home/Slider'

export default function Home() {

  return (
    <main className='bg-sky-500'>
      <Navbar />
      <header className='py-16'>
        <Slider />
        <Labels />
      </header>
    </main>
  )
}
