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
  const messages = conversation?.messages
  const isGroup = conversation?.isGroup

  return !conversation ? (
    <div className='h-full flex-1'>
      <div className='h-full flex flex-col'>
        {/* Error if conversation is not found or if the current user is not in the conversation */}
        <EmptyState title={"Oops! There's nothing to display here."} />
      </div>
    </div>
  ) : (
    <div className='h-full flex-1'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        <ConversationBody initialMessages={messages || []} isGroup={isGroup} />
        <MessageForm />
      </div>
    </div>
  )
}

export default ConversationId
