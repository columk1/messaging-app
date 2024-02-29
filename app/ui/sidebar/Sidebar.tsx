import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'
import { getSession } from '@/app/lib/actions'

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession()
  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={session?.user} />
      <MobileFooter />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  )
}

export default Sidebar
