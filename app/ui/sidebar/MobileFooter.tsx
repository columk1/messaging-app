'use client'

import useConversation from '@/app/hooks/useConversation'
import useRoutes from '@/app/hooks/useRoutes'
import { useState } from 'react'
import MobileItem from './MobileItem'

const MobileFooter = () => {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  return isOpen ? null : (
    <div className='fixed flex justify-between items-center w-full bottom-0 z-40 bg-white border-t-[1px] lg:hidden'>
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          href={item.href}
          label={item.label}
          icon={item.icon}
          active={item.active}
          onClick={item.onClick}
        />
      ))}
    </div>
  )
}

export default MobileFooter
