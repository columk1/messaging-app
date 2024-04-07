import Link from 'next/link'
import { HiChevronLeft } from 'react-icons/hi2'

interface SettingsHeaderProps {
  title: string
  subtitle: string
}

const SettingsHeader = ({ title, subtitle }: SettingsHeaderProps) => {
  return (
    <div className='w-full flex justify-between items-center sm:px-4 py-3 px-4 lg:px-6 bg-purple-3 border-b border-purple-gray shadow-sm'>
      <div className='flex gap-3 items-center'>
        <Link
          className='lg:hidden block text-gray-350 hover:text-gray-200 transition'
          href='/settings'
        >
          <HiChevronLeft size={32} />
        </Link>
        <div className='flex flex-col text-gray-200'>
          <h3 className='text-xl font-semibold'>{title}</h3>
          <div className='text-sm font-light text-gray-400'>{subtitle}</div>
        </div>
      </div>
    </div>
  )
}

export default SettingsHeader
