'use client'

interface MessageInputProps {
  type?: string
  id: string
  name: string
  placeholder?: string
  required?: boolean
  error?: string | null
}
const MessageInput = ({ type, id, name, placeholder, required, error }: MessageInputProps) => {
  return (
    <div className='relative w-full'>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={id}
        required={required}
        className='w-full text-gray-200 font-light py-2 px-4 bg-purple-0 rounded-full placeholder-gray-350 focus:outline-none'
      />
    </div>
  )
}

export default MessageInput
