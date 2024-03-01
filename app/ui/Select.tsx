'use client'

import ReactSelect from 'react-select'

interface SelectProps {
  label: string
  id: string
  name?: string
  value?: Record<string, any>
  onChange?: (value: Record<string, any>) => void
  options: Record<string, any>[]
  disabled?: boolean
}

const Select: React.FC<SelectProps> = ({ label, id, name, value, onChange, options, disabled }) => {
  return (
    <div className='z-[100]'>
      <label htmlFor={id} className='block text-sm font-medium leading-6 text-gray-200'>
        {label}
      </label>
      <div className='mt-2'>
        <ReactSelect
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          isDisabled={disabled}
          required
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            valueContainer: (base) => ({ ...base, color: '#e5e7eb' }),
          }}
          classNames={{
            menu: () => 'bg-purple-0 text-gray-200',
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: 'white', // border
              primary25: '#8b8dBd', // option hover
              primary50: '#AbAdDd', // option active
              neutral0: '#6b6d9d', // rest of input container
              neutral10: '#8b8dBd', // selected multi-value
              neutral20: '#e5e7eb', // border and symbols
              neutral40: 'white', // symbol hover
              neutral50: 'lightgray', // placeholder
              neutral60: 'white', // symbol focused
              neutral80: 'white', // text, symbol active
              danger: 'white', // remove multi-value hover text
              dangerLight: '#A4A6C8', // remove multi-value hover
            },
          })}
        />
      </div>
    </div>
  )
}

export default Select
