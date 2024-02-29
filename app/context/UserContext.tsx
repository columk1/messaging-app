'use client'

import { createContext, useEffect, useState } from 'react'
import { getUsers } from '@/app/lib/actions'
import { ClientUser } from '@/app/lib/definitions'

export const UserContext = createContext<ClientUser[]>([])

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<ClientUser[]>([])

  useEffect(() => {
    if (users) return
    console.log('Fetching users')
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers)
    }
    fetchUsers()
  }, [])
  return <UserContext.Provider value={users}>{children}</UserContext.Provider>
}

export default UserProvider
