'use client'

import React, { useCallback, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { FiAlertTriangle } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Modal from '@/app/ui/Modal'
import useConversation from '@/app/hooks/useConversation'
import { toast } from 'react-hot-toast'
import Button from '@/app/ui/Button'

interface ConfirmModalProps {
  isOpen?: boolean
  onClose: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { conversationId } = useConversation()
  const [loading, setLoading] = useState(false)

  // Delete the conversation
  const onDelete = useCallback(async () => {
    setLoading(true)

    fetch(`/api/conversations/${conversationId}`, {
      method: 'DELETE',
    })
      .then(() => {
        onClose()
        router.push('/conversations')
        router.refresh()
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setLoading(false))
  }, [conversationId, router, onClose])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='sm:flex sm:items-start'>
        <div className='flex flex-shrink-0 items-center justify-center mx-auto h-12 w-12 rounded-full bg-purple-gray sm:mx-0 sm:h-10 sm:w-10'>
          <FiAlertTriangle className='h-6 w-6 mb-1 text-rose-500' />
        </div>
        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
          <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-200'>
            Delete conversation
          </Dialog.Title>
          <div className='mt-2'>
            <p className='text-sm text-gray-400'>
              Are you sure you want to delete this conversation? This action cannot be undone
            </p>
          </div>
        </div>
      </div>
      <div className='mt-4 flex flex-row-reverse gap-2'>
        <Button disabled={loading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={loading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
