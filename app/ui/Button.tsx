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
        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ' +
          className,
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary ? 'text-gray-900' : 'text-white',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
      )}
    >
      {children}
    </button>
  )
}

export default Button
