'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from '@/app/ui/Modal'
import Input from '@/app/ui/Input'
import Select from '@/app/ui/Select'
import Button from '@/app/ui/Button'
import { ClientUser } from '@/app/lib/definitions'

interface GroupChatModalProps {
  isOpen?: boolean
  onClose: () => void
  users: ClientUser[]
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ isOpen, onClose, users }) => {
  const router = useRouter()
  const [formData, setFormData] = useState<Record<string, any>>({ isGroup: 'true' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    fetch('/api/conversations', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          router.refresh()
          onClose()
        } else {
          throw new Error(res.statusText)
        }
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
              Create a named chat with two or more people.
            </p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input
                label='Name'
                id='name'
                name='name'
                defaultValue=''
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={loading}
              />
              <Select
                label='Members'
                id='members'
                options={users.map((user) => ({ value: user.id, label: user.name }))}
                onChange={(value) => setFormData({ ...formData, members: value })}
                disabled={loading}
              />
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-2'>
          <Button type='button' onClick={onClose} secondary disabled={loading}>
            Cancel
          </Button>
          <Button type='submit' disabled={loading}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default GroupChatModal
