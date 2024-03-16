import EmptyState from '../../ui/EmptyState'

const Contacts = async () => {
  return (
    <div className='hidden lg:block flex-1 h-full'>
      <EmptyState title={'Select a contact to start chatting'} />
    </div>
  )
}

export default Contacts
