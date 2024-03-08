// Note: Session Provider must be rendered like this in a client component. Server components can be children.
'use client'

import { SessionProvider } from 'next-auth/react'

interface AuthContextProps {
  children: React.ReactNode
}

const AuthContext = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthContext
