'use client'

// import { Message } from '@prisma/client'
import { FullMessageType } from '@/app/lib/definitions'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import Avatar from '@/app/ui/Avatar'
import { format } from 'date-fns'
import Image from 'next/image'

interface MessageProps {
  message: FullMessageType
  isLast?: boolean
}
const MessageItem: React.FC<MessageProps> = ({ message, isLast }) => {
  const session = useSession()
  const senderName = message?.sender?.firstName + '' + message?.sender?.lastName

  const isOwn = session?.data?.user?.email === message?.sender?.email
  const seenList = (message.seen || [])
    .filter((user) => user.email !== message?.sender?.email)
    .map((user) => `${user.firstName} ${user.lastName}`)
    .join(', ')

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end')
  const avatar = clsx(isOwn && 'order-2')
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end')
  const messageBody = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
    message.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  )

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar imageUrl={message.sender?.image} />
      </div>
      <div className={body}>
        <div className='flex items-center gap-1'>
          {/* <div className='text-sm text-gray-500'>{senderName}</div> */}
          <div className='text-xs text-gray-400'>{format(new Date(message.createdAt), 'p')}</div>
        </div>
        <div className={messageBody}>
          {message.image ? (
            <Image
              alt='image'
              height='288'
              width='288'
              src={message.image}
              className='object-cover cursor-pointer hover:scale-110 transition translate'
            />
          ) : (
            <div>{message.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className='text-xs font-light text-gray-500'>{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  )
}

export default MessageItem
