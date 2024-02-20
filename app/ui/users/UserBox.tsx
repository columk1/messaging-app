'use client'

import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import Avatar from '@/app/ui/Avatar'

interface UserBoxProps {
  user: User
}

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    setLoading(true)
    const response = await fetch('http://localhost:3000/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id }),
    })
    const data = await response.json()
    router.push(`/conversations/${data.id}`)
    setLoading(false)
  }, [user, router])
  return (
    <button
      onClick={handleClick}
      className='w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 rounded-lg transition'
    >
      <Avatar imageUrl={user.image!} />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-sm font-medium text-gray-900'>{`${user.firstName} ${user.lastName}`}</p>
          </div>
        </div>
      </div>
    </button>
  )
}

export default UserBox