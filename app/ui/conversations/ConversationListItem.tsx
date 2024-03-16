'use client'

import { FullConversationType } from '@/app/lib/definitions'
import { useMemo } from 'react'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import useOtherUser from '@/app/hooks/useOtherUser'
import Avatar from '@/app/ui/Avatar'
import AvatarGroup from '../AvatarGroup'
import Link from 'next/link'

interface ConversationListItemProps {
  conversation: FullConversationType
  selected?: boolean
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({ conversation, selected }) => {
  const otherUser = useOtherUser(conversation)
  const session = useSession()

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || []
    return messages[messages.length - 1]
  }, [conversation.messages])

  const username = session.data?.user?.username

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false // No messages yet
    const seenArray = lastMessage.seen || []

    // Possibly no email if useSession hasn't loaded yet
    if (!username) return false

    return seenArray.some((user) => user.username === username)
  }, [username, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return 'Sent an image'
    if (lastMessage?.body) return lastMessage.body

    return 'Started a conversation'
  }, [lastMessage])

  return (
    <div className='mx-3'>
      <Link
        href={`/conversations/${conversation.id}`}
        className={clsx(
          `w-full px-3 py-2 flex items-center space-x-3 rounded-lg border-l-8 hover:bg-purple-2 transition`,
          selected ? 'bg-purple-2 border-violet-400' : 'bg-purple-3 border-transparent'
        )}
      >
        {conversation.isGroup ? (
          <AvatarGroup imageUrls={conversation.users.map((user) => user.image)} />
        ) : (
          <Avatar imageUrl={otherUser?.image!} username={otherUser?.username || ''} />
        )}
        <div className='min-w-0 flex-1'>
          <div className='focus:outline-none'>
            <div className='flex justify-between items-center mb-1'>
              <p className='text-md font-medium text-gray-200'>
                {conversation.name || otherUser?.name}
              </p>
              {lastMessage?.createdAt && (
                <p className='text-xs text-gray-350 font-light'>
                  {format(new Date(lastMessage.createdAt), 'p')}
                </p>
              )}
            </div>
            <p
              className={clsx(
                `truncate text-xs text-left`,
                hasSeen ? 'text-gray-350' : 'text-gray-200 font-medium'
              )}
            >
              {lastMessageText}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ConversationListItem
