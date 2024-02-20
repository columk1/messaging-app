'use client'

import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import { format } from 'date-fns'
import { Fragment, useMemo } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { IoClose, IoTrash } from 'react-icons/io5'
import Avatar from '@/app/ui/Avatar'

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[]
  }
  isOpen: boolean
  onClose: () => void
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ data, isOpen, onClose }) => {
  const otherUser = useOtherUser(data)

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP')
  }, [otherUser.createdAt])

  const title = useMemo(() => {
    return data.name || otherUser.firstName + ' ' + otherUser.lastName
  }, [data.name, otherUser])

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`
    }
    return 'Active'
  }, [data])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-40'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='w-screen max-w-md pointer-events-auto'>
                    <div className='flex flex-col h-full overflow-y-scroll bg-white py-6 shadow-xl'>
                      <div className='px-4 sm:px-6'>
                        <div className='flex items-start justify-end'>
                          <div className='flex items-center ml-3 h-7'>
                            <button
                              onClick={onClose}
                              className='rounded-md bg-white text-gray-400 hover:text-gray-500'
                            >
                              <span className='sr-only'>Close panel</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                        <div className='flex flex-col items-center'>
                          <div className='mb-2'>
                            <Avatar imageUrl={otherUser.image} />
                          </div>
                          <div>{title}</div>
                          <div className='text-sm text-gray-500'>{statusText}</div>
                          <div className='flex gap-10 my-8'>
                            <button
                              onClick={() => {}}
                              className='flex flex-col items-center gap-3 hover:opacity-75'
                            >
                              <div className='w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center'>
                                <IoTrash size={20} />
                              </div>
                              <div className='text-sm font-light text-neutral-600'>Delete</div>
                            </button>
                          </div>
                          <div className='w-full py-5 sm:px-0 sm:pt-0'>
                            <dl className='space-y-8 px-4 sm:space-y-6 sm:px-6'>
                              {!data.isGroup && (
                                <>
                                  <div>
                                    <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                      Email
                                    </dt>
                                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                      {otherUser.email}
                                    </dd>
                                  </div>
                                  <hr />
                                  <div>
                                    <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                      Joined
                                    </dt>
                                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                      <time dateTime={joinedDate}>{joinedDate}</time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default ProfileDrawer