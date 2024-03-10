import Link from 'next/link'
import { HiChevronLeft } from 'react-icons/hi2'

const SettingsHeader = ({ title }: { title: string }) => {
  return (
    <div className='lg:hidden w-full flex justify-between items-center sm:px-4 py-3 px-4 lg:px-6 bg-purple-2 border-b border-purple-gray shadow-sm'>
      <div className='flex gap-3 items-center'>
        <Link
          className='lg:hidden block text-gray-350 hover:text-gray-200 transition'
          href='/settings'
        >
          <HiChevronLeft size={32} />
        </Link>
      </div>
      <div className='flex flex-col text-gray-200'>
        <div>Settings</div>
        <div className='text-sm font-light text-gray-400'>Profile</div>
      </div>
    </div>
  )
}

export default SettingsHeader
