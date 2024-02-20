'use client'

import useConversation from '@/app/hooks/useConversation'
import { useState } from 'react'
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2'
import MessageInput from './MessageInput'
import { CldUploadButton } from 'next-cloudinary'

const MessageForm = () => {
  const { conversationId } = useConversation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = Object.fromEntries(new FormData(e.currentTarget))
    formData.conversationId = conversationId
    console.log(formData)

    e.currentTarget.message.value = ''

    const res = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
  }

  const handleUpload = (result: any) => {
    fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        image: result?.info?.secure_url,
        conversationId,
      }),
    })
  }

  return (
    <div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
      <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset='xi5pas5g'>
        <HiPhoto size={30} className='text-sky-500' />
      </CldUploadButton>
      <form onSubmit={handleSubmit} className='w-full flex items-center gap-2 lg:gap-4'>
        <MessageInput
          id='message'
          name='message'
          error={error}
          required
          placeholder='Write a message'
        />
        <button className='rounded-full p-2 bg-sky-500 hover:bg-sky-600 transition'>
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  )
}

export default MessageForm
