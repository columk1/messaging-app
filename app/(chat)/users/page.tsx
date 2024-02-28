import EmptyState from '../../ui/EmptyState'
import { getUsers } from '@/app/lib/actions'
import UserList from '@/app/ui/users/UserList'

const Users = async () => {
  const users = await getUsers()
  return (
    <>
      <UserList items={users} />
      <div className='hidden lg:block flex-1 h-full'>
        <EmptyState />
      </div>
    </>
  )
}

export default Users
