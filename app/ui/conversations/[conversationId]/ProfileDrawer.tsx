'use client'

import { Conversation, User } from '@prisma/client'
import { format } from 'date-fns'
import { Fragment, useMemo, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { IoClose, IoTrash } from 'react-icons/io5'
import Avatar from '@/app/ui/Avatar'
import ConfirmModal from './ConfirmModal'
import AvatarGroup from '../../AvatarGroup'
import useActiveList from '@/app/hooks/useActiveList'
import { ConversationUser } from '@/app/lib/definitions'

interface ProfileDrawerProps {
  data: Conversation & {
    users: ConversationUser[]
  }
  otherUser: ConversationUser
  isOpen: boolean
  onClose: () => void
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ data, otherUser, isOpen, onClose }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const { members } = useActiveList()
  const isActive = members.indexOf(otherUser?.username!) !== -1

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP')
  }, [otherUser.createdAt])

  const title = useMemo(() => {
    return data.name || otherUser.name
  }, [data.name, otherUser.name])

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`
    }
    return isActive ? 'Active' : 'Offline'
  }, [data, isActive])

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-20' onClose={onClose}>
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
                      <ConfirmModal
                        isOpen={isConfirmModalOpen}
                        onClose={() => setIsConfirmModalOpen(false)}
                      ></ConfirmModal>

                      <div className='flex flex-col h-full overflow-y-scroll bg-purple-1 py-6 shadow-xl'>
                        <div className='px-4 sm:px-6'>
                          <div className='flex items-start justify-end'>
                            <div className='flex items-center ml-3 h-7'>
                              <button
                                onClick={onClose}
                                className='rounded-md bg-gradient-to-br from-violet-500 to-violet-400 hover:from-violet-400 hover:to-violet-300 text-gray-200 hover:text-gray-100'
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
                              {data.isGroup ? (
                                <AvatarGroup imageUrls={data.users.map((user) => user.image)} />
                              ) : (
                                <Avatar
                                  imageUrl={otherUser?.image}
                                  username={otherUser?.username || ''}
                                />
                              )}
                            </div>
                            <div className='text-gray-200'>{title}</div>
                            <div className='text-sm text-gray-350'>{statusText}</div>
                            <div className='flex gap-10 my-8'>
                              <button
                                onClick={() => {
                                  setIsConfirmModalOpen(true)
                                }}
                                className='flex flex-col items-center gap-3 group text-gray-200 hover:text-gray-100'
                              >
                                <div className='w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-400 group-hover:from-violet-400 group-hover:to-violet-300 rounded-full flex items-center justify-center'>
                                  <IoTrash size={20} />
                                </div>
                                <div className='text-sm font-light'>Delete</div>
                              </button>
                            </div>
                            <div className='w-full py-5 sm:px-0 sm:pt-0'>
                              <dl className='space-y-8 px-4 sm:space-y-6 sm:px-6'>
                                {data.isGroup ? (
                                  <div>
                                    <dt className='text-sm font-medium text-gray-350 sm:w-40 sm:flex-shrink-0'>
                                      Usernames
                                    </dt>
                                    <dd className='mt-1 text-sm text-gray-200 sm:col-span-2'>
                                      {data.users.map((user) => user.username).join(', ')}
                                    </dd>
                                  </div>
                                ) : (
                                  <>
                                    <div>
                                      <dt className='text-sm font-medium text-gray-350 sm:w-40 sm:flex-shrink-0'>
                                        Username
                                      </dt>
                                      <dd className='mt-1 text-sm text-gray-200 sm:col-span-2'>
                                        {otherUser.username}
                                      </dd>
                                    </div>
                                    <hr className='border-gray-350' />
                                    <div>
                                      <dt className='text-sm font-medium text-gray-350 sm:w-40 sm:flex-shrink-0'>
                                        Joined
                                      </dt>
                                      <dd className='mt-1 text-sm text-gray-200 sm:col-span-2'>
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
    </>
  )
}

export default ProfileDrawer
