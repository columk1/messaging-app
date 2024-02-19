'use client'

import clsx from 'clsx'
import Link from 'next/link'

interface MobileItemProps {
  href: string
  label: string
  icon: any
  active?: boolean
  onClick?: () => void
}

const MobileItem: React.FC<MobileItemProps> = ({ href, icon: Icon, active, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'flex-1 justify-center gap-x-3 p-4 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100',
        active && 'bg-gray-100 text-black'
      )}
    >
      <Icon className='h-6 w-6 mx-auto' />
    </Link>
  )
}

export default MobileItem
