'use client'

import Modal from '@/app/ui/Modal'
import Image from 'next/image'

interface ImageModalProps {
  src: string | null
  isOpen: boolean
  onClose: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({ src, isOpen, onClose }) => {
  return (
    src && (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className='w-80 h-80'>
          <Image src={src} alt='User image' fill className={'object-cover'} />
        </div>
      </Modal>
    )
  )
}

export default ImageModal
