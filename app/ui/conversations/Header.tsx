'use client'

import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { useMemo } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import Avatar from '@/app/ui/Avatar'

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return 'Active' // TODO: When websocket is implemented
  }, [conversation])

  return (
    <div className='w-full flex justify-between items-center sm:px-4 py-3 px-4 lg:px-6 bg-white border-b-[1px] shadow-sm'>
      <div className='flex gap-3 items-center'>
        <Link
          className='lg:hidden block text-sky-500 hover:text-sky-600 transition'
          href='/conversations'
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar imageUrl={otherUser.image!} />
        <div className='flex flex-col'>
          <div>{conversation.name || `${otherUser.firstName} ${otherUser.lastName}`}</div>
          <div className='text-sm font-light text-neutral-500'>{statusText}</div>
        </div>
      </div>
      <button onClick={() => {}}>
        <HiEllipsisHorizontal size={32} className='text-sky-500 hover:text-sky-600 transition' />
      </button>
    </div>
  )
}

export default Header
