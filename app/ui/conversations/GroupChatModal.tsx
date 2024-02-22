'use client'

import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from '@/app/ui/Modal'
import Input from '@/app/ui/Input'
import Select from '@/app/ui/Select'
import Button from '@/app/ui/Button'

interface GroupChatModalProps {
  isOpen?: boolean
  onClose: () => void
  users: User[]
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ isOpen, onClose, users }) => {
  const router = useRouter()
  const [members, setMembers] = useState<Record<string, any>>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)

    const formData = Object.fromEntries(new FormData(e.currentTarget))
    formData.isGroup = 'true'

    fetch('/api/conversations', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then(() => {
        router.refresh()
        onClose()
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setLoading(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>Create a group chat</h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Create a chat with more than 2 people.
            </p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input
                label='Name'
                id='name'
                name='name'
                defaultValue=''
                required
                disabled={loading}
              />
              <Select
                label='Members'
                value={members}
                options={users.map((user) => ({ value: user.id, label: user.name }))}
                onChange={(value) => {
                  setMembers(value)
                }}
                disabled={loading}
              />
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-6'></div>
        <Button type='button' onClick={onClose} secondary disabled={loading}>
          Cancel
        </Button>
        <Button type='submit' disabled={loading}></Button>
      </form>
    </Modal>
  )
}

export default GroupChatModal
