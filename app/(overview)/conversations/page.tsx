import EmptyState from '@/app/ui/EmptyState'

const Home = () => {
  return (
    <div className='flex-1 h-full hidden lg:block'>
      <EmptyState title={'Select a chat or start a new conversation'} />
    </div>
  )
}

export default Home
