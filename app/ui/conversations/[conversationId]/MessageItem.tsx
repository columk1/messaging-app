'use client'

// import { Message } from '@prisma/client'
import { FullMessageType } from '@/app/lib/definitions'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import Avatar from '@/app/ui/Avatar'
import { format } from 'date-fns'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import ImageModal from './ImageModal'

interface MessageProps {
  data: FullMessageType
  isLast?: boolean
  isGroup?: boolean | null
  matchesPreviousSender: boolean
  color: string
}
const MessageItem: React.FC<MessageProps> = ({
  data,
  isLast,
  isGroup,
  matchesPreviousSender,
  color,
}) => {
  const session = useSession()
  const [imageModalOpen, setImageModalOpen] = useState(false)

  const senderName = data?.sender?.name

  const isOwn = session?.data?.user?.username === data?.sender?.username
  const seenList = (data.seen || [])
    .filter((user) => user.username !== data?.sender?.username)
    .map((user) => user.username)
    .join(', ')

  const sentAt = useMemo(() => format(new Date(data.createdAt), 'HH:mm'), [data.createdAt])

  const container = clsx(
    'flex gap-3 px-4',
    isOwn && 'justify-end',
    matchesPreviousSender ? 'pt-0' : 'pt-2'
  )
  const avatar = clsx('', isOwn && 'order-2')
  const body = clsx('flex flex-col gap-1', isOwn && 'items-end')
  const messageBody = clsx(
    'flex flex-col text-sm w-fit text-gray-50 overflow-hidden',
    matchesPreviousSender && 'rounded-lg',
    isOwn
      ? 'bg-gradient-to-br from-violet-500 to-violet-400 text-gray-50 rounded-l-lg rounded-br-lg'
      : 'bg-purple-0 rounded-r-lg rounded-bl-lg',
    data.image ? (isGroup ? 'pt-1 pb-1 px-1' : 'rounded-md bg-gray-100') : 'py-2 px-1'
  )

  return (
    <div className={container}>
      <div className={body}>
        <div className={messageBody}>
          <div className='flex items-center gap-3 px-2'>
            {isGroup && !isOwn && !matchesPreviousSender && (
              <div className={`text-sm pb-1 text-${color} font-semibold`}>{senderName}</div>
            )}
          </div>

          {data.image ? (
            <div className='relative'>
              <ImageModal
                src={data.image}
                isOpen={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
              />
              <Image
                onClick={() => setImageModalOpen(true)}
                alt='Image Message'
                height='288'
                width='288'
                placeholder='blur'
                blurDataURL='/placeholder-image.webp'
                src={data.image}
                className='object-cover cursor-pointer rounded-lg'
              />
              <div className='absolute bottom-[2px] right-[7px] text-xs text-right text-white text-opacity-75'>
                {sentAt}
              </div>
            </div>
          ) : (
            <div className='relative pl-2 pr-[44px] text-gray-100'>
              {data.body}
              <div
                className={`absolute bottom-[-6px] right-[3px] text-xs text-right ${
                  isOwn ? 'text-gray-300' : 'text-gray-350'
                }`}
              >
                {sentAt}
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-col justify-end'>
          {/* Target last message from otherUser if user has sent lastMessage */}

          {isLast && isOwn && seenList.length > 0 && (
            <div className='text-xs font-light text-gray-350'>{`Seen by ${seenList}`}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageItem
