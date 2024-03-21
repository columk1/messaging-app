import ContactList from '@/app/ui/contacts/ContactList'

const ContactsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ContactList />
      {children}
    </>
  )
}

export default ContactsLayout
