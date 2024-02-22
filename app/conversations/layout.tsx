import Sidebar from '@/app/ui/sidebar/Sidebar'
import ConversationList from '@/app/ui/conversations/ConversationList'
import { getConversations, getUsers } from '@/app/lib/actions'

const ConversationsLayout = async ({ children }: { children: React.ReactNode }) => {
  const conversations = await getConversations()
  const users = await getUsers() // Check if this is necessary (if users are populated above)
  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  )
}

export default ConversationsLayout
