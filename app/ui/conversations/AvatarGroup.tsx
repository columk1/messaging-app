'use client'

import { User } from '@prisma/client'
import Image from 'next/image'

interface AvatarGroupProps {
  users: User[]
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
  const slicedUsers = users.slice(0, 3)

  const positionMap: { [key: number]: string } = {
    0: users.length === 2 ? 'top-[12px] left-0' : 'top-0 left-[12px]',
    1: users.length === 2 ? 'top-[12px] right-0' : 'bottom-0 left-0',
    2: 'bottom-0 right-0',
  }

  console.log(slicedUsers)

  return (
    <div className='relative h-11 w-11'>
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block rounded-full overflow-hidden h-[22px] w-[22px] ${positionMap[index]}`}
        >
          <Image src={user?.image || '/placeholder.jpg'} alt='Profile Picture' fill />
        </div>
      ))}
    </div>
  )
}

export default AvatarGroup
