import Sidebar from '@/app/ui/sidebar/Sidebar'
import { getUsers } from '@/app/lib/actions'
import UserList from '@/app/ui/users/UserList'

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers()
  return (
    <Sidebar>
      <div className='h-full'>
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  )
}

export default UsersLayout
