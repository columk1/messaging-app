'use client'

import { User } from '@prisma/client'
import useActiveList from '@/app/hooks/useActiveList'

interface AvatarProps {
  imageUrl?: string | null
  userEmail: string
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, userEmail }) => {
  const { members } = useActiveList()
  const isActive = members.indexOf(userEmail) !== -1

  return (
    <div className='relative h-9 w-9 md:h-11 md:w-11'>
      <div className='relative inline-block rounded-full overflow-hidden border-2 border-gray-200'>
        <img
          src={imageUrl || '/placeholder.jpg'}
          alt='Profile Picture'
          className='object-fit w-full h-full'
        />
      </div>
      {isActive ? (
        <span className='absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3' />
      ) : null}
    </div>
  )
}

export default Avatar
