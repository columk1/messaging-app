'use client'

import Button from './ui/Button'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()
  return (
    <div className='h-screen text-center text-gray-200 flex flex-col items-center justify-center gap-6'>
      <div className='flex items-center gap-3'>
        <h1 className='text-3xl font-bold'>404</h1>
        <div className='w-[1px] h-full bg-gray-200'></div>
        <div>This page could not be found</div>
      </div>
      <Button onClick={() => router.back()}>Go back</Button>
    </div>
  )
}

export default NotFound
