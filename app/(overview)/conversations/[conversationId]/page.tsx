import { getConversationById, getMessages } from '@/app/lib/actions'
import EmptyState from '@/app/ui/EmptyState'
import ConversationBody from '@/app/ui/conversations/[conversationId]/ConversationBody'
import Header from '@/app/ui/conversations/[conversationId]/Header'
import MessageForm from '@/app/ui/conversations/[conversationId]/MessageForm'

interface Params {
  conversationId: string
}

const ConversationId = async ({ params }: { params: Params }) => {
  const conversation = await getConversationById(params.conversationId)
  // const messages = await getMessages(params.conversationId)
  const messages = conversation?.messages

  return !conversation ? (
    <div className='h-full flex-1'>
      <div className='h-full flex flex-col'>
        <EmptyState />
      </div>
    </div>
  ) : (
    <div className='h-full flex-1'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        <ConversationBody initialMessages={messages || []} />
        <MessageForm />
      </div>
    </div>
  )
}

export default ConversationId
