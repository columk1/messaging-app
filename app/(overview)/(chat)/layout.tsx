import UserProvider from '@/app/context/UserContext'

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>
}

export default ChatLayout
