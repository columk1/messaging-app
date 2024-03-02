import Sidebar from '@/app/ui/sidebar/Sidebar'
import UserProvider from '@/app/context/UserContext'

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <UserProvider>
        <div className='h-full flex bg-purple-3'>{children}</div>
      </UserProvider>
    </Sidebar>
  )
}

export default ChatLayout
