'use client'

import ContactListItem from './ContactListItem'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/app/context/UserContext'
import { HiMiniPencilSquare, HiOutlineUserPlus } from 'react-icons/hi2'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'
import { ClientUser } from '@/app/lib/definitions'
import { getContacts } from '@/app/lib/actions'

const ContactList: React.FC = () => {
  const { users } = useContext(UserContext)
  const [isEditable, setIsEditable] = useState(false)

  const path = usePathname()
  const isBasePath = path === '/contacts'

  return (
    <aside
      className={clsx(
        `pb-20 lg:pb-0 lg:w-80 block overflow-y-auto bg-purple-3 border-r border-purple-gray w-full`,
        !isBasePath && 'hidden lg:block'
      )}
    >
      <div className='px-5'>
        <div className='flex justify-between py-3 mb-4 border-b border-purple-gray'>
          <div className='text-2xl font-bold text-gray-200'>Contacts</div>
          <button
            onClick={() => setIsEditable(!isEditable)}
            className='rounded-full p-2 bg-violet-400 text-gray-200 hover:opacity-75 transition'
          >
            <HiMiniPencilSquare size={16} className='' />
          </button>
          <span className='sr-only'>Edit Contacts</span>
        </div>
      </div>
      <div className='mx-3'>
        <Link
          href={'/contacts/new'}
          className='w-full px-3 py-2 flex items-center space-x-3 rounded-lg transition group hover:bg-purple-2'
        >
          <div className='relative h-9 w-9 md:h-11 md:w-11 '>
            <div className='md:h-11 md:w-11 h-9 w-9 flex items-center justify-center relative bg-violet-500 group-hover:scale-[1.01] rounded-full overflow-hidden border-gray-100'>
              <HiOutlineUserPlus className='text-gray-200 text-2xl' />
            </div>
          </div>
          <div className='min-w-0 flex-1'>
            <div className='flex justify-between items-center mb-1'>
              <p className='text-sm font-medium text-gray-200'>New Contact</p>
            </div>
          </div>
        </Link>
      </div>
      {/* <hr className='border-purple-gray mx-5 my-1' /> */}
      {users &&
        users.map((userInfo) => (
          <ContactListItem key={userInfo.id} user={userInfo} isEditable={isEditable} />
        ))}
    </aside>
  )
}

export default ContactList
