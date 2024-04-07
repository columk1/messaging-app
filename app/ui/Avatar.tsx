'use client'

import useActiveList from '@/app/hooks/useActiveList'

interface AvatarProps {
  imageUrl?: string | null
  username: string
}

const Avatar = ({ imageUrl, username }: AvatarProps) => {
  const { members } = useActiveList()
  const isActive = members.indexOf(username) !== -1

  return (
    <div className='relative h-11 w-11'>
      <div className='relative inline-block rounded-full overflow-hidden border-2 border-gray-100'>
        <img
          src={imageUrl || '/placeholder.jpg'}
          alt='Profile Picture'
          className='object-cover aspect-square'
        />
      </div>
      {isActive ? (
        <span className='absolute block rounded-full bg-green-500 outline outline-2 outline-gray-100 top-[3px] right-[3px] h-2 w-2' />
      ) : null}
    </div>
  )
}

export default Avatar
