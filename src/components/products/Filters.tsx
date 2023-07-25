import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DrawIcon from '@mui/icons-material/Draw';
import AirIcon from '@mui/icons-material/Air';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import GamingIcon from '@/icons/GamingIcon';
import OfficeIcon from '@/icons/OfficeIcon';
import GraphicsIcon from '@/icons/GraphicsIcon';
import ThinLightIcon from '@/icons/ThinLightIcon';
import StudyIcon from '@/icons/StudyIcon';
import ArrowUpIcon from '@/icons/ArrowUpIcon';
import ArrowDownIcon from '@/icons/ArrowDownIcon';

const Filters = () => {
  return (
    <section className="max-w-7xl m-auto my-2 bg-white rounded px-4">
      <div className="">
        <ul className="flex justify-between py-2">
          <li className='flex gap-2 items-center bg-gray-100 rounded-full px-4 cursor-pointer'>
            <GamingIcon w={20} h={20} />
            <h4 className='text-sm'>Gaming</h4>
          </li>
          <li className='flex gap-2 items-center bg-gray-100 rounded-full px-4 cursor-pointer'>
            <StudyIcon w={20} h={20} />
            <h4 className='text-sm'>Office, Study</h4>
          </li>
          <li className='flex gap-2 items-center bg-gray-100 rounded-full px-4 cursor-pointer'>
            <GraphicsIcon w={20} h={20} />
            <h4 className='text-sm'>Graphics</h4>
          </li>
          <li className='flex gap-2 items-center bg-gray-100 rounded-full px-4 cursor-pointer'>
            <ThinLightIcon w={20} h={20} />
            <h4 className='text-sm'>Thin, Light</h4>
          </li>
          <li className='flex gap-2 items-center bg-gray-100 rounded-full px-4 cursor-pointer'>
            <ArrowUpIcon w={20} h={20} />
            <h4 className='text-sm'>Price up</h4>
          </li>
          <li className='flex gap-2 items-center bg-gray-100 rounded-full px-4 cursor-pointer'>
            <ArrowDownIcon w={20} h={20} />
            <h4 className='text-sm'>Price down</h4>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Filters