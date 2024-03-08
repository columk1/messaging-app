'use client'

import { ClientUser } from '@/app/lib/definitions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from '@/app/ui/Modal'
import Input from '@/app/ui/Input'
import Image from 'next/image'
import { CldUploadButton } from 'next-cloudinary'
import Button from '@/app/ui/Button'
import clsx from 'clsx'
import { User } from 'next-auth'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  currentUser: User | null
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentUser }) => {
  const router = useRouter()
  const [image, setImage] = useState(currentUser?.image)
  const [loading, setLoading] = useState(false)

  const handleUpload = (result: any) => {
    setImage(result.info.secure_url)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)

    const formData = Object.fromEntries(new FormData(e.currentTarget))
    if (image) formData.image = image

    fetch('/api/settings', {
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
          <div className='border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>Profile</h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>Edit your public information.</p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input
                label='Name'
                id='name'
                name='name'
                defaultValue={currentUser?.name ?? ''}
                required
                disabled={loading}
              />
              <div>
                <label className='block text-sm font-medium leading-6 text-gray-900'>Photo</label>
                <div className='mt-2 flex items-center gap-x-3'>
                  <Image
                    width='48'
                    height='48'
                    className='rounded-full'
                    src={image || currentUser?.image || '/images/placeholder.jpg'}
                    alt='Avatar'
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset='xi5pas5g'
                  >
                    {/* Use a span here with button styling since it will be nested inside a button component and will throw an error in the browser */}
                    <span
                      className={clsx(
                        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                        loading && 'opacity-50 cursor-default'
                      )}
                    >
                      Upload
                    </span>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center justify-end gap-2'>
            <Button onClick={onClose} secondary disabled={loading}>
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default SettingsModal
