'use client'

import useConversation from '@/app/hooks/useConversation'
import { FullMessageType } from '@/app/lib/definitions'
import { useEffect, useRef, useState } from 'react'
import MessageItem from './MessageItem'

interface BodyProps {
  initialMessages: FullMessageType[]
}

const ConversationBody: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()

  useEffect(() => {
    console.log('fetching')
    fetch(`/api/conversations/${conversationId}/seen`, {
      method: 'POST',
    })
  }, [conversationId])

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
