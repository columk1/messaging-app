'use client'

import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/app/context/UserContext'
import { HiChevronLeft, HiOutlineUserPlus } from 'react-icons/hi2'
import UserList from '@/app/ui/contacts/ContactList'
import UserListItem from '@/app/ui/contacts/ContactListItem'
import { getUsers } from '@/app/lib/actions'
import { ClientUser } from '@/app/lib/definitions'
import NewUserListItem from '@/app/ui/contacts/NewContactListItem'
import { useRouter } from 'next/navigation'
import Input from '@/app/ui/Input'

const NewContact = () => {
  const [users, setUsers] = useState<ClientUser[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (users.length > 0) return
    console.log('Fetching users')
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers || [])
    }
    fetchUsers()
  }, [router])

  return (
    <div className='h-full flex-1'>
      <div className='h-full flex flex-col'>
        {/* HEADER */}
        <div className='w-full flex justify-between items-center sm:px-4 py-3 px-4 lg:px-6 bg-purple-2 border-b border-purple-gray shadow-sm'>
          <div className='flex gap-3 items-center'>
            <Link
              className='lg:hidden block text-gray-350 hover:text-gray-200 transition'
              href='/contacts'
            >
              <HiChevronLeft size={32} />
            </Link>
            <div className='flex flex-col text-gray-200'>
              <h3 className='text-xl font-semibold'>Add Contacts</h3>
              <div className='text-sm font-light text-gray-400'>Find people you may know</div>
            </div>
          </div>
        </div>

        {/* USERLIST */}
        <div className='px-5 mt-2 mb-4 max-w-sm'>
          <Input
            type='text'
            label='Search'
            ariaLabel='Search'
            id='search'
            name='search'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></Input>
        </div>
        <hr className='border-purple-gray' />
        <div className='flex-1 pb-4 bg-purple-3 overflow-y-auto'>
          <div className='lg:pb-6 pb-20 block border-r border-purple-gray w-full mt-2'>
            <div className='px-5'></div>

            {/* <hr className='border-purple-gray mx-5 my-1' /> */}
            {users
              .filter(
                (user) =>
                  user.username.includes(searchQuery.toLowerCase()) ||
                  user.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((userInfo) => (
                <NewUserListItem
                  key={userInfo.id}
                  user={userInfo}
                  handleAddUser={(user: ClientUser) => {}}
                />
              ))}
          </div>
        </div>
        {/* <NewContactForm /> */}
      </div>
    </div>
  )
}

export default NewContact
