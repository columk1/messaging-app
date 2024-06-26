import { IconType } from 'react-icons'

interface AuthSocialButtonProps {
  icon: IconType
  onClick: () => void
}

const AuthSocialButton = ({ icon: Icon, onClick }: AuthSocialButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='inline-flex w-full justify-center rounded-md bg-purple-violet px-4 py-2 text-gray-100 shadow-sm outline outline-1 outline-gray-300 hover:bg-violet-300 focus:outline-offset-0'
    >
      <Icon />
    </button>
  )
}

export default AuthSocialButton
