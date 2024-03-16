'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback, useContext } from 'react'
import Avatar from '@/app/ui/Avatar'
import { User } from 'next-auth'
import toast from 'react-hot-toast'
import { ClientUser } from '@/app/lib/definitions'
import { revalidatePath } from 'next/cache'
import { UserContext } from '@/app/context/UserContext'

interface UserListItemProps {
  user: ClientUser
  handleAddUser: (user: ClientUser) => void
}

const NewContactListItem: React.FC<UserListItemProps> = ({ user, handleAddUser }) => {
  const { users, setUsers } = useContext(UserContext)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    if (users.find((e) => e.id === user?.id)) {
      toast.error(`${user?.name} is already in your contacts`)
      return
    }
    setLoading(true)
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id }),
    })

    if (!response.ok) {
      toast.error('Something went wrong')
      setLoading(false)
      return
    }

    toast.success(`${user?.name} added to contacts`)
    setUsers((prev) => [...prev, user])
    setLoading(false)
  }, [user, router])
  return (
    <div className='mx-3'>
      <button
        onClick={handleClick}
        className='w-full px-3 py-2 flex items-center space-x-3 hover:bg-purple-2 rounded-lg transition'
      >
        <Avatar imageUrl={user?.image} username={user?.username || ''} />
        <div className='min-w-0 flex-1'>
          <div className='flex flex-col'>
            <div className='flex justify-between items-center'>
              <p className='text-sm font-medium text-gray-200'>{user?.name}</p>
            </div>
            <p className='text-xs text-gray-400 text-left'>{user.username}</p>
          </div>
        </div>
      </button>
    </div>
  )
}

export default NewContactListItem
