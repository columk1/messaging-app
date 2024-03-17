import Link from 'next/link'
import { HiChevronLeft, HiOutlineCog8Tooth } from 'react-icons/hi2'

interface SettingsHeaderProps {
  title: string
  subtitle: string
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className='w-full flex justify-between items-center sm:px-4 py-3 px-4 lg:px-6 bg-purple-3 lg:bg-purple-4 border-b border-purple-gray shadow-sm'>
      <div className='flex gap-3 items-center'>
        <Link
          className='lg:hidden block text-gray-350 hover:text-gray-200 transition'
          href='/settings'
        >
          <HiChevronLeft size={32} />
        </Link>
        {/* <div className='relative h-9 w-9 md:h-11 md:w-11 '>
          <div className='md:h-11 md:w-11 h-9 w-9 flex items-center justify-center relative rounded-full overflow-hidden border-gray-100'>
            <HiOutlineCog8Tooth className='text-gray-400 text-2xl' />
          </div>
        </div> */}
        <div className='flex flex-col text-gray-200'>
          <h3 className='text-xl font-semibold'>{title}</h3>
          <div className='text-sm font-light text-gray-400'>{subtitle}</div>
        </div>
      </div>
    </div>
  )
}

export default SettingsHeader
