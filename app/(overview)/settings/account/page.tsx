'use client'

import Button from '@/app/ui/Button'
import SettingsHeader from '@/app/ui/settings/SettingsHeader'
import { signOut } from 'next-auth/react'

const Account = () => {
  return (
    <div className='h-full flex flex-1 flex-col'>
      <SettingsHeader title='Account' subtitle={'Manage your account'} />
      <div className='h-full'>
        <div className='flex flex-col px-4 py-8 sm:px-6 lg:px-8 h-full bg-purple-4'>
          <p className='mt-1 text-sm font-medium text-gray-200'>Sign out of your account</p>
          <div className='mt-6 flex flex-col gap-y-8'>
            <Button onClick={() => signOut()}>Logout</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
