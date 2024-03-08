import EmptyState from '../../ui/EmptyState'
import UserList from '@/app/ui/users/UserList'

const Users = async () => {
  return (
    <>
      <UserList />
      <div className='hidden lg:block flex-1 h-full'>
        <EmptyState />
      </div>
    </>
  )
}

export default Users
