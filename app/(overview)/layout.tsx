import Sidebar from '@/app/ui/sidebar/Sidebar'

const OverviewLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <div className='h-full flex bg-purple-3'>{children}</div>
    </Sidebar>
  )
}

export default OverviewLayout
