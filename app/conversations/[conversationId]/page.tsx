import { getConversationById, getMessages } from '@/app/lib/actions'
import EmptyState from '@/app/ui/EmptyState'
import ConversationBody from '@/app/ui/conversations/ConversationBody'
import Header from '@/app/ui/conversations/Header'
import MessageForm from '@/app/ui/conversations/MessageForm'

interface Params {
  conversationId: string
}

const ConversationId = async ({ params }: { params: Params }) => {
  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)

  return !conversation ? (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <EmptyState />
      </div>
    </div>
  ) : (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        <ConversationBody />
        <MessageForm />
      </div>
    </div>
  )
}

export default ConversationId
