'use client'

import useConversation from '@/app/hooks/useConversation'
import { FullMessageType } from '@/app/lib/definitions'
import { useEffect, useRef, useState } from 'react'
import MessageItem from './MessageItem'
import { pusherClient } from '@/app/lib/pusher'
import { useSession } from 'next-auth/react'

interface BodyProps {
  initialMessages: FullMessageType[]
}

const ConversationBody: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()
  const session = useSession()

  // Let other users know last message has been seen when convo is loaded or messages update
  useEffect(() => {
    bottomRef?.current?.scrollIntoView()
    // Return if last message already seen by user
    if (
      messages[messages.length - 1]?.seen.find((user) => user.email === session?.data?.user?.email)
    )
      return

    console.log('POST /seen')
    fetch(`/api/conversations/${conversationId}/seen`, {
      method: 'POST',
    })
  }, [conversationId, messages])

  useEffect(() => {
    pusherClient.subscribe(conversationId)

    const messageHandler = (message: FullMessageType) => {
      // fetch(`/api/conversations/${conversationId}/seen`, {
      //   method: 'POST',
      // })
      setMessages((prevMessages) => {
        return prevMessages.find((item) => item.id === message.id)
          ? prevMessages
          : [...prevMessages, message]
      })
    }

    // Update a message (seen status)
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((prevMessages) =>
        prevMessages.map((message) => {
          if (message.id === newMessage.id) {
            return newMessage
          } else {
            return message
          }
        })
      )
    }

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)

    // Clean up on unmount
    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId])

  // useEffect(() => bottomRef?.current?.scrollIntoView(), [messages])

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, i) => (
        <MessageItem key={message.id} data={message} isLast={i === messages.length - 1} />
      ))}
      <div ref={bottomRef} className='pt-4'></div>
    </div>
  )
}

export default ConversationBody
