import Sidebar from '@/app/ui/sidebar/Sidebar'

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <div className='h-full flex'>{children}</div>
    </Sidebar>
  )
}

export default ChatLayout
