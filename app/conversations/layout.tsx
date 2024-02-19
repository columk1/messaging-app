import Sidebar from '@/app/ui/sidebar/Sidebar'
import ConversationList from '@/app/ui/conversations/ConversationList'
import { getConversations } from '@/app/lib/actions'

const ConversationsLayout = async ({ children }: { children: React.ReactNode }) => {
  const conversations = await getConversations()
  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  )
}

export default ConversationsLayout
