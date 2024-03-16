'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback, useContext } from 'react'
import Avatar from '@/app/ui/Avatar'
import { User } from 'next-auth'
import { HiOutlineXMark } from 'react-icons/hi2'
import toast from 'react-hot-toast'
import { UserContext } from '@/app/context/UserContext'

interface UserListItemProps {
  user: User | null
  isEditable: boolean
}

const UserListItem: React.FC<UserListItemProps> = ({ user, isEditable }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { setUsers } = useContext(UserContext)

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

  const handleDelete = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setLoading(true)
      const response = await fetch('/api/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      })

      if (!response.ok) {
        toast.error('Something went wrong')
        setLoading(false)
        return
      }

      toast.success(`${user?.name} removed from contacts`)
      setUsers((prev) => prev.filter((e) => e.id !== user?.id))
      setLoading(false)
    },
    [user, router]
  )

  return (
    <div className='flex items-center'>
      <button
        onClick={handleClick}
        className='w-full mx-3 px-3 py-2 flex items-center space-x-3 hover:bg-purple-2 rounded-lg transition'
      >
        <Avatar imageUrl={user?.image} username={user?.username || ''} />
        <div className='min-w-0 flex-1'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-sm font-medium text-gray-200'>{user?.name}</p>
          </div>
        </div>
      </button>
      {isEditable && (
        <div className='flex items-center mr-3 h-7'>
          <button
            onClick={handleDelete}
            className='rounded-md p-1 bg-purple-1 text-gray-200 hover:text-gray-100 hover:bg-rose-400'
          >
            <span className='sr-only'>Delete Contact</span>
            <HiOutlineXMark size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default UserListItem
