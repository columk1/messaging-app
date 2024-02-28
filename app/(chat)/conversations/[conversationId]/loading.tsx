'use client' // Test this for performance

import Avatar from '@/app/ui/Avatar'
import Spinner from '@/app/ui/Spinner'
import MessageForm from '@/app/ui/conversations/[conversationId]/MessageForm'

const Loading = () => {
  return (
    <div className='w-full flex flex-col mx-auto'>
      <div className='w-full h-[75.5px] flex-1 flex justify-between items-center sm:px-4 py-3 px-4 lg:px-6 bg-white border-b-[1px] shadow-sm'>
        <div className='flex gap-3 items-center'>
          <Avatar imageUrl={'/placeholder.jpg'} userEmail={''} />
        </div>
      </div>
      <Spinner />
      <MessageForm />
    </div>
  )
}

export default Loading
