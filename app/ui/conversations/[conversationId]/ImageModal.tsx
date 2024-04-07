'use client'

import Modal from '@/app/ui/Modal'
import Image from 'next/image'

interface ImageModalProps {
  src: string | null
  isOpen: boolean
  onClose: () => void
}

const ImageModal = ({ src, isOpen, onClose }: ImageModalProps) => {
  return (
    src && (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className='relative h-80'>
          <Image
            src={src}
            alt='Image Preview'
            fill
            className='object-contain'
            placeholder='blur'
            blurDataURL='/placeholder-image.webp'
            sizes='(max-width: 768px) 100vw, 33vw'
          />
        </div>
      </Modal>
    )
  )
}

export default ImageModal
