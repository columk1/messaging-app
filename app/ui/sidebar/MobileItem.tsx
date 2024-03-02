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
        'flex-1 justify-center gap-x-3 p-4 text-sm leading-6 font-semibold text-gray-400 hover:text-gray-200 hover:bg-purple-1',
        active && 'bg-purple-1 text-gray-200'
      )}
    >
      <Icon className={clsx('h-6 w-6 mx-auto', active && 'text-gray-200')} />
    </Link>
  )
}

export default MobileItem
