'use client'

import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '@/app/context/UserContext'
import { HiChevronLeft, HiOutlineUserPlus } from 'react-icons/hi2'
import UserList from '@/app/ui/contacts/UserList'
import UserListItem from '@/app/ui/contacts/UserListItem'

const NewContact = () => {
  const users = useContext(UserContext)

  return (
    <div className='h-full flex-1'>
      <div className='h-full flex flex-col'>
        {/* HEADER */}
        <div className='lg:hidden w-full flex justify-between items-center sm:px-4 py-3 px-4 lg:px-6 bg-purple-2 border-b border-purple-gray shadow-sm'>
          <div className='flex gap-3 items-center'>
            <Link
              className='lg:hidden block text-gray-350 hover:text-gray-200 transition'
              href='/contacts'
            >
              <HiChevronLeft size={32} />
            </Link>
          </div>
          <div className='flex flex-col text-gray-200'>
            <div>Contacts</div>
            <div className='text-sm font-light text-gray-400'>New Contact</div>
          </div>
        </div>

        {/* USERLIST */}
        <div className='flex-1'>
          <div className='pb-20 lg:pb-0 lg:w-80 block overflow-y-auto bg-purple-3 border-r border-purple-gray w-full'>
            <div className='px-5'>
              <div className='text-2xl font-bold text-gray-200 py-3 mb-4 border-b border-purple-gray'>
                Contacts
              </div>
            </div>

            {/* <hr className='border-purple-gray mx-5 my-1' /> */}
            {users.map((userInfo) => (
              <UserListItem key={userInfo.id} user={userInfo} />
            ))}
          </div>
        </div>
        {/* <NewContactForm /> */}
      </div>
    </div>
  )
}

export default NewContact
