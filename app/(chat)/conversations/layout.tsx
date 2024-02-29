import ConversationList from '@/app/ui/conversations/ConversationList'
import { getConversations } from '@/app/lib/actions'

const ConversationsLayout = async ({ children }: { children: React.ReactNode }) => {
  const conversations = await getConversations()
  return (
    <>
      <ConversationList initialItems={conversations} />
      {children}
    </>
  )
}

export default ConversationsLayout
