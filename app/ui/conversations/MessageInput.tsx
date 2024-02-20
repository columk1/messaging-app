'use client'

interface MessageInputProps {
  type?: string
  id: string
  name: string
  placeholder?: string
  required?: boolean
  error?: string | null
}
const MessageInput: React.FC<MessageInputProps> = ({
  type,
  id,
  name,
  placeholder,
  required,
  error,
}) => {
  return (
    <div className='relative w-full'>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={id}
        required={required}
        className='w-full text-black font-light py-2 px-4 bg-neutral-100 rounded-full focus:outline-none'
      />
    </div>
  )
}

export default MessageInput
