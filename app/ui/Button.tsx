import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset' | undefined
  fullWidth?: boolean
  onClick?: () => void
  secondary?: boolean
  danger?: boolean
  disabled?: boolean
  children?: React.ReactNode
}

const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'flex h-10 justify-center items-center rounded-lg bg-purple-0 px-4 text-sm font-medium text-white transition-colors hover:bg-[#9496b8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 active:bg-violet-200 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ' +
          className,
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary ? 'text-gray-900 bg-purple-violet hover:bg-violet-300' : 'text-white',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary &&
          !danger &&
          'bg-violet-500 hover:bg-violet-400 focus-visible:outline-violet-300'
      )}
    >
      {children}
    </button>
  )
}

export default Button
