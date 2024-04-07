'use client'

import clsx from 'clsx'
import Link from 'next/link'

interface DesktopItemProps {
  label: string
  href: string
  icon: any
  active?: boolean
  onClick?: () => void
}

const DesktopItem = ({ label, href, icon: Icon, onClick, active }: DesktopItemProps) => {
  return (
    <li onClick={onClick}>
      <Link
        href={href}
        className={clsx(
          `
      group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-400 hover:text-gray-200 hover:bg-purple-1`,
          active && 'bg-purple-1 text-gray-300'
        )}
      >
        <Icon className={clsx('h-6 w-6 shrink-0', active && 'text-gray-200')} />
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  )
}

export default DesktopItem
