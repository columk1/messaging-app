import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import {
  HiArrowLeftOnRectangle,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUsers,
  HiOutlineCog8Tooth,
} from 'react-icons/hi2'
import { signOut } from 'next-auth/react'

import useConversation from './useConversation'

const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation()

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiOutlineChatBubbleLeftRight,
        active: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiOutlineUsers,
        active: pathname === '/users',
      },
      {
        label: 'Settings',
        href: '/settings',
        icon: HiOutlineCog8Tooth,
        active: pathname === '/settings',
      },
      {
        label: 'Logout',
        href: '#',
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ],
    [pathname, conversationId]
  )

  return routes
}

export default useRoutes
