'use client'

import { User } from 'next-auth'
import Avatar from '../Avatar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { HiOutlineKey } from 'react-icons/hi2'

interface SettingsNavProps {
  user: User | null
}

const SettingsNav = ({ user }: SettingsNavProps) => {
  const path = usePathname()
  const isBasePath = path === '/settings'
  return (
    <aside
      className={clsx(
        `pb-20 lg:pb-0 lg:w-80 block overflow-y-auto bg-purple-3 border-r border-purple-gray w-full`,
        !isBasePath && 'hidden lg:block'
      )}
    >
      <div className='px-5'>
        <div className='text-2xl font-bold text-gray-200 py-3 mb-4 border-b border-purple-gray'>
          Settings
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <div className='mx-3'>
              <Link
                href={'/settings/profile'}
                className={clsx(
                  `w-full px-3 py-2 flex items-center space-x-3 border-l-8 rounded-lg transition hover:bg-purple-2`,
                  path === '/settings/profile'
                    ? 'bg-purple-2 border-violet-400'
                    : 'border-transparent'
                )}
              >
                <Avatar imageUrl={user?.image} username={user?.username || ''} />
                <div className='min-w-0 flex-1'>
                  <div className='flex justify-between items-center'>
                    <p className='text-sm font-medium text-gray-200'>{user?.name}</p>
                  </div>
                </div>
              </Link>
            </div>
            <hr className='mb-4 border-none' />
          </li>
          <hr className='border-purple-gray mx-5 my-4' />
          <li>
            <div className='mx-3'>
              <Link
                href='/settings/account'
                className={clsx(
                  `w-full px-3 py-2 flex items-center space-x-3 border-l-8 rounded-lg transition hover:bg-purple-2`,
                  path === '/settings/account'
                    ? 'bg-purple-2 border-violet-400'
                    : 'border-transparent'
                )}
              >
                <div className='min-w-0 flex-1'>
                  <div className='flex gap-3 items-center text-gray-400'>
                    <span className='h-6 w-6 flex items-center justify-center border border-gray-400 rounded-md'>
                      <HiOutlineKey />
                    </span>
                    <p className='text-sm font-medium text-gray-200'>Account</p>
                  </div>
                </div>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default SettingsNav
