'use client'

import clsx from 'clsx'

interface InputProps {
  type?: string
  label: string
  id: string
  name: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  errors?: any
  disabled?: boolean
}

const Input = ({
  type,
  label,
  id,
  name,
  defaultValue,
  onChange,
  required,
  errors,
  disabled,
}: InputProps) => {
  return (
    <div>
      <label className='block text-sm font-medium leading-6 text-gray-200' htmlFor={id}>
        {label}
      </label>
      <div className='mt-2'>
        <input
          type={type}
          id={id}
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          autoComplete={id}
          disabled={disabled}
          required={required}
          className={clsx(
            `block w-full rounded-md border-0 py-1.5 px-3 text-gray-200 bg-purple-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
            errors && errors[id] && 'focus: ring-rose-500',
            disabled && 'opacity-50 cursor-default'
          )}
        />
      </div>
    </div>
  )
}

export default Input
