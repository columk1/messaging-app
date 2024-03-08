import Sidebar from '@/app/ui/sidebar/Sidebar'
import UserProvider from '../context/UserContext'

const OverviewLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <Sidebar>
        <div className='h-full flex bg-purple-3'>{children}</div>
      </Sidebar>
    </UserProvider>
  )
}

export default OverviewLayout
