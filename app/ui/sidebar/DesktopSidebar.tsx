'use client'

import useRoutes from '@/app/hooks/useRoutes'
import { useState } from 'react'
import DesktopItem from './DesktopItem'
import Avatar from '../Avatar'
import SettingsModal from './SettingsModal'
import { User } from 'next-auth'

interface DesktopSidebarProps {
  currentUser: User | null
}

const DesktopSidebar = ({ currentUser }: DesktopSidebarProps) => {
  const routes = useRoutes()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className='hidden lg:fixed lg:flex lg:flex-col justify-between lg:inset-y-0 lg:left-0 lg:z-10 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-purple-2 lg:border-r border-purple-gray lg:pb-4'>
        <nav className='flex flex-col justify-between mt-4'>
          <ul className='flex flex-col items-center space-y-1'>
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className='flex flex-col justify-between items-center mt-4'>
          <button
            onClick={() => setIsOpen(true)}
            className='cursor-pointer hover:opacity-75 transition'
          >
            <Avatar imageUrl={currentUser?.image} username={currentUser?.username || ''} />
          </button>
        </nav>
      </div>
    </>
  )
}

export default DesktopSidebar
