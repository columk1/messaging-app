'use client'

import { ClientUser } from '@/app/lib/definitions'
import UserBox from './UserBox'

interface UserListProps {
  items: ClientUser[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside className='pb-20 lg:pb-0 lg:w-80 lg:block overflow-y-auto bg-white border-r border-gray-200 block w-full left-0'>
      <div className='px-5'>
        <div className='flex-col'>
          <div className='text-2xl font-bold text-neutral-800 py-4'>Users</div>
        </div>
        {items.map((userInfo) => (
          <UserBox key={userInfo.id} user={userInfo} />
        ))}
      </div>
    </aside>
  )
}

export default UserList
