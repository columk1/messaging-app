'use client'

import { AtSymbolIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface InputProps {
  type?: string
  label: string
  id: string
  name: string
  defaultValue?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  min?: number
  max?: number
  errors?: any
  errorMsg?: string
  disabled?: boolean
}

const Input = ({
  type,
  label,
  id,
  name,
  defaultValue,
  placeholder,
  onChange,
  required,
  min,
  max,
  errors,
  errorMsg,
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
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={id}
          disabled={disabled}
          required={required}
          minLength={min}
          maxLength={max}
          className={clsx(
            `peer block w-full rounded-md border-0 py-1.5 px-3 text-gray-200 bg-purple-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-rose-500`,
            errors && errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default'
          )}
        />
        <span className='mt-2 hidden text-sm text-rose-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
          {errorMsg}
        </span>
      </div>
    </div>
  )
}

export default Input
