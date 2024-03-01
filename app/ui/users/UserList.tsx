'use client'

import UserListItem from './UserListItem'
import { useContext } from 'react'
import { UserContext } from '@/app/context/UserContext'

const UserList: React.FC = () => {
  const users = useContext(UserContext)
  return (
    <aside className='pb-20 lg:pb-0 lg:w-80 lg:block overflow-y-auto bg-purple-3 border-r border-purple-gray block w-full'>
      <div className='px-5'>
        <div className='text-2xl font-bold text-gray-200 py-3 mb-4 border-b border-purple-gray'>
          Users
        </div>
      </div>
      {users.map((userInfo) => (
        <UserListItem key={userInfo.id} user={userInfo} />
      ))}
    </aside>
  )
}

export default UserList
