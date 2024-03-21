'use client'

// import { Message } from '@prisma/client'
import { FullMessageType } from '@/app/lib/definitions'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import Avatar from '@/app/ui/Avatar'
import { format } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'
import ImageModal from './ImageModal'

interface MessageProps {
  data: FullMessageType
  isLast?: boolean
  isGroup?: boolean
}
const MessageItem: React.FC<MessageProps> = ({ data, isLast, isGroup }) => {
  const session = useSession()
  const [imageModalOpen, setImageModalOpen] = useState(false)

  const senderName = data?.sender?.name

  const isOwn = session?.data?.user?.username === data?.sender?.username
  const seenList = (data.seen || [])
    .filter((user) => user.username !== data?.sender?.username)
    .map((user) => user.username)
    .join(', ')

  const container = clsx('flex gap-3 px-4 py-1', isOwn && 'justify-end')
  const avatar = clsx(isOwn && 'order-2')
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end')
  const messageBody = clsx(
    'text-sm w-fit text-gray-50 overflow-hidden',
    isOwn && !data.image
      ? 'bg-gradient-to-br from-violet-500 to-violet-400 text-gray-50'
      : 'bg-purple-0',
    data.image ? 'rounded-md p-0 bg-gray-100' : 'rounded-full py-2 px-3'
  )

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar imageUrl={data.sender?.image} username={data.sender?.username || ''} />
      </div>
      <div className={body}>
        <div className='flex flex-col'>
          {isGroup && !isOwn && <div className='text-sm pb-[2px] text-gray-300'>{senderName}</div>}
        </div>
        <div className={messageBody}>
          {data.image ? (
            <>
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
                className='object-cover cursor-pointer'
              />
            </>
          ) : (
            <div className=''>{data.body}</div>
          )}
        </div>
        <div className='flex flex-col justify-end'>
          {/* TODO: target last message from otherUser if user has sent lastMessage */}

          <div className='text-xs text-right text-gray-400'>
            {format(new Date(data.createdAt), 'p')}
          </div>
          {isLast && isOwn && seenList.length > 0 && (
            <div className='text-xs font-light text-gray-400'>{`Seen by ${seenList}`}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageItem
