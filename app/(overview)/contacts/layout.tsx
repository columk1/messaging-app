import UserList from '@/app/ui/contacts/ContactList'

const ContactsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserList />
      {children}
    </>
  )
}

export default ContactsLayout
