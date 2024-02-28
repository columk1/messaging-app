import EmptyState from '../../ui/EmptyState'
import { getUsers } from '@/app/lib/actions'
import UserList from '@/app/ui/users/UserList'

const Users = async () => {
  const users = await getUsers()
  return (
    <>
      <UserList items={users} />
      <div className='hidden lg:block lg:pl-80 h-full'>
        <EmptyState />
      </div>
    </>
  )
}

export default Users
