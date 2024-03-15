import UserList from '@/app/ui/contacts/UserList'

const ContactsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserList />
      {children}
    </>
  )
}

export default ContactsLayout
