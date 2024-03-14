'use client'

import { User } from 'next-auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Input from '@/app/ui/Input'
import { CldUploadButton } from 'next-cloudinary'
import clsx from 'clsx'
import Button from '@/app/ui/Button'

import { useSession } from 'next-auth/react'

interface SettingsFormProps {
  user: User | null
}

const SettingsForm: React.FC<SettingsFormProps> = ({ user }) => {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [image, setImage] = useState(user?.image)
  const [loading, setLoading] = useState(false)

  const handleUpload = (result: any) => {
    setImage(result.info.secure_url)
  }

  const handleUpdateSession = async (formData: any) => {
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: formData.name,
        image: formData.image || user?.image,
      },
    }
    await update(newSession)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = Object.fromEntries(new FormData(e.currentTarget))
    if (image) formData.image = image

    fetch('/api/settings', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then(() => {
        handleUpdateSession(formData).then(() => {
          router.refresh()
          toast.success('Saved')
        })
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setLoading(false))
  }

  return (
    <div className='flex flex-col px-4 py-10 sm:px-6 lg:px-8 h-full bg-purple-4'>
      <form onSubmit={handleSubmit}>
        <h2 className='text-xl font-semibold text-gray-200'>Profile</h2>
        <p className='mt-1 text-sm leading-6 text-gray-400'>Edit your public information.</p>
        <div className='mt-6 flex flex-col gap-y-8'>
          <Input
            label='Name'
            id='name'
            name='name'
            defaultValue={user?.name ?? ''}
            required
            disabled={loading}
          />
          <div>
            <label className='block text-sm font-medium leading-6 text-gray-200'>
              Profile Picture
            </label>
            <div className='mt-2 p-4 flex gap-4 rounded-md border border-gray-500'>
              <img
                width='48'
                height='48'
                className='rounded-full aspect-square object-cover'
                src={image || '/placeholder.jpg'}
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
                    'w-max flex h-10 items-center rounded-lg bg-purple-0 border px-4 text-sm font-medium text-gray-100 transition-colors hover:bg-purple-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 active:bg-purple-3 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                    loading && 'opacity-50 cursor-default'
                  )}
                >
                  Upload a New Image
                </span>
              </CldUploadButton>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Button type='submit' disabled={loading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SettingsForm
