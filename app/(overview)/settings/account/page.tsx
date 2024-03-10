'use client'

import Button from '@/app/ui/Button'
import SettingsHeader from '@/app/ui/settings/SettingsHeader'
import { signOut } from 'next-auth/react'

const Account = () => {
  return (
    <div className='h-full flex flex-1 flex-col'>
      <SettingsHeader title='Account' />
      <div className='h-full'>
        <div className='flex flex-col px-4 py-10 sm:px-6 lg:px-8 h-full bg-purple-4'>
          <h2 className='text-xl font-semibold text-gray-200'>Account</h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>Manage your account</p>
          <div className='mt-6 flex flex-col gap-y-8'>
            <Button onClick={() => signOut()}>Logout</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
