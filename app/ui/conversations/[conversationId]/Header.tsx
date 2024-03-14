'use client'

import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, Message } from '@prisma/client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import Avatar from '@/app/ui/Avatar'
import ProfileDrawer from './ProfileDrawer'
import AvatarGroup from '../../AvatarGroup'
import useActiveList from '@/app/hooks/useActiveList'
import { ConversationUser, FullMessageType } from '@/app/lib/definitions'

interface HeaderProps {
  conversation: Conversation & {
    users: ConversationUser[]
    messages: FullMessageType[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { members } = useActiveList()
  const isActive = members.indexOf(otherUser?.email!) !== -1

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return isActive ? 'Active' : 'Offline'
  }, [conversation, isActive])

  return (
    <>
      <ProfileDrawer
        data={conversation}
        otherUser={otherUser}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className='w-full flex justify-between items-center sm:px-4 py-3 px-4 lg:px-6 bg-purple-2 border-b border-purple-gray shadow-sm'>
        <div className='flex gap-3 items-center'>
          <Link
            className='lg:hidden block text-gray-350 hover:text-gray-200 transition'
            href='/conversations'
          >
            <HiChevronLeft size={32} />
          </Link>

          {conversation.isGroup ? (
            <AvatarGroup imageUrls={conversation.users.map((user) => user.image)} />
          ) : (
            <Avatar imageUrl={otherUser?.image} userEmail={otherUser?.email || ''} />
          )}
          <div className='flex flex-col text-gray-200'>
            <div>{conversation.name || otherUser?.name}</div>
            <div className='text-sm font-light text-gray-400'>{statusText}</div>
          </div>
        </div>
        <button onClick={() => setDrawerOpen(true)}>
          <HiEllipsisHorizontal
            size={35}
            className='text-gray-350 hover:text-gray-200 transition'
          />
        </button>
      </div>
    </>
  )
}

export default Header
