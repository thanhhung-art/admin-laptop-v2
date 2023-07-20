import Laptop from "@/images/Lg_ultraPc.jpg";
import Image from "next/image";
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Card = () => {
  return (
    <section className="bg-white px-4 rounded-md py-8">
      <div className="flex justify-center">
        <Image src={Laptop} alt="laptop" width={280} />
      </div>
      <h4 className="max-w-[300px] text-center text-md font-semibold mt-4">LG UltraPC 16U70R-K.AAS7U1 Thin and Lightweight Laptop,Gray</h4>
      <ul className="flex my-2">
        {[1,2,3,4,5].map(e => (<li key={e}><StarIcon fontSize="small" sx={{color: 'rgb(240, 191, 76)'}} /></li>)) }
      </ul>
      <div className="flex justify-between items-center">
        <h3>$329.99</h3>
        <span className="cursor-pointer"><AddShoppingCartIcon fontSize="small" /></span>
      </div>
    </section>
  )
}

export default Card