'use client'

import Image from 'next/image'

interface AvatarGroupProps {
  imageUrls: (string | null)[]
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ imageUrls = [] }) => {
  const slicedUrls = imageUrls.slice(0, 3)

  const positionMap: { [key: number]: string } = {
    0: imageUrls.length === 2 ? 'top-[12px] left-0' : 'top-0 left-[12px]',
    1: imageUrls.length === 2 ? 'top-[12px] right-0' : 'bottom-0 left-0',
    2: 'bottom-0 right-0',
  }

  return (
    <div className='relative h-11 w-11'>
      {slicedUrls.map((url, index) => (
        <div
          key={url || index}
          className={`absolute inline-block rounded-full overflow-hidden border-2 border-gray-100 h-[22px] w-[22px] ${positionMap[index]}`}
        >
          <Image src={url || '/placeholder.jpg'} alt='Profile Picture' fill />
        </div>
      ))}
    </div>
  )
}

export default AvatarGroup
