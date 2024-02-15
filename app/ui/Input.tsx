'use client'

import clsx from 'clsx'

interface InputProps {
  label: string
  id: string
  type?: string
  required?: boolean
  errors: any
  disabled?: boolean
}

const Input = ({ label, id, type, required, errors, disabled }: InputProps) => {
  return (
    <div>
      <label className='block text-sm font-medium leading-6 text-gray-900' htmlFor={id}>
        {label}
      </label>
      <div className='mt-2'>
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          required={required}
          className={clsx(
            `form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
            errors[id] && 'focus: ring-rose-500'
          )}
        />
      </div>
    </div>
  )
}

export default Input
