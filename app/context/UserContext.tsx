'use client'

import { createContext, useEffect, useState } from 'react'
import { getContacts } from '@/app/lib/actions'
import { ClientUser } from '@/app/lib/definitions'

export const UserContext = createContext<{
  users: ClientUser[]
  setUsers: React.Dispatch<React.SetStateAction<ClientUser[]>>
}>({
  users: [],
  setUsers: () => {},
})

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<ClientUser[]>([])

  useEffect(() => {
    if (users.length > 0) return
    const fetchUsers = async () => {
      const fetchedUsers = await getContacts()
      setUsers(fetchedUsers || [])
    }
    fetchUsers()
  }, [])
  return <UserContext.Provider value={{ users, setUsers }}>{children}</UserContext.Provider>
}

export default UserProvider
