import { getConversationById, getMessages } from '@/app/lib/actions'
import { ClientUser } from '@/app/lib/definitions'
import EmptyState from '@/app/ui/EmptyState'
import ConversationBody from '@/app/ui/conversations/[conversationId]/ConversationBody'
import Header from '@/app/ui/conversations/[conversationId]/Header'
import MessageForm from '@/app/ui/conversations/[conversationId]/MessageForm'

function computeColorMap(users: ClientUser[] | undefined) {
  if (!users) return null
  const colors = [
    'purple-300',
    'rose-300',
    'teal-300',
    'yellow-300',
    'emerald-300',
    'orange-300',
    'cyan-300',
  ]
  const map: { [key: string]: string } = {}
  users.forEach((user, i) => {
    map[user.username] = colors[i % colors.length]
  })
  return map
}

interface Params {
  conversationId: string
}

const ConversationId = async ({ params }: { params: Params }) => {
  const conversation = await getConversationById(params.conversationId)
  const messages = conversation?.messages
  const isGroup = conversation?.isGroup

  const colorMap = computeColorMap(conversation?.users)

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
        <ConversationBody initialMessages={messages || []} isGroup={isGroup} colorMap={colorMap} />
        <MessageForm />
      </div>
    </div>
  )
}

export default ConversationId
