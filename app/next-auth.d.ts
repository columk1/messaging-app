import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    username: string
  }

  interface Session {
    user: User
  }

  interface Profile {
    login: string
    given_name: string
    family_name: string
  }
}
