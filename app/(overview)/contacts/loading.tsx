'use client' // Test this for performance

import LoadingModal from '@/app/ui/Loading'

const Loading = () => {
  return (
    <div className='flex-1 h-full hidden lg:block'>
      <LoadingModal />
    </div>
  )
}

export default Loading
