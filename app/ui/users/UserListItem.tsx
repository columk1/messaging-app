'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import Avatar from '@/app/ui/Avatar'
import { User } from 'next-auth'

interface UserListItemProps {
  user: User | null
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    setLoading(true)
    const response = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id }),
    })
    const data = await response.json()
    router.push(`/conversations/${data.id}`)
    setLoading(false)
  }, [user, router])
  return (
    <button
      onClick={handleClick}
      className='w-full px-5 py-2 flex items-center space-x-3 hover:bg-purple-2 rounded-sm transition'
    >
      <Avatar imageUrl={user?.image} username={user?.username || ''} />
      <div className='min-w-0 flex-1'>
        <div className='flex justify-between items-center mb-1'>
          <p className='text-sm font-medium text-gray-200'>{user?.name}</p>
        </div>
      </div>
    </button>
  )
}

export default UserListItem
