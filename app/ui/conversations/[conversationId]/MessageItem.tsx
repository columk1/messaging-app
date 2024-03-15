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
}
const MessageItem: React.FC<MessageProps> = ({ data, isLast }) => {
  const session = useSession()
  const [imageModalOpen, setImageModalOpen] = useState(false)

  const senderName = data?.sender?.name

  const isOwn = session?.data?.user?.username === data?.sender?.username
  const seenList = (data.seen || [])
    .filter((user) => user.username !== data?.sender?.username)
    .map((user) => user.username)
    .join(', ')

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end')
  const avatar = clsx(isOwn && 'order-2')
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end')
  const messageBody = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn && !data.image ? 'bg-violet-400 text-gray-50' : 'bg-gray-100',
    data.image ? 'rounded-md p-0 bg-gray-100' : 'rounded-full py-2 px-3'
  )

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar imageUrl={data.sender?.image} username={data.sender?.username || ''} />
      </div>
      <div className={body}>
        <div className='flex items-center gap-1'>
          {/* <div className='text-sm text-gray-500'>{senderName}</div> */}
          <div className='text-xs text-gray-400'>{format(new Date(data.createdAt), 'p')}</div>
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
            <div>{data.body}</div>
          )}
        </div>
        {/* TODO: target last message from otherUser if user has sent lastMessage */}
        {isLast && isOwn && seenList.length > 0 && (
          <div className='text-xs font-light text-gray-500'>{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  )
}

export default MessageItem
