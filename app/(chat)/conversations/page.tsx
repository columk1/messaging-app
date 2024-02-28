'use client'

import clsx from 'clsx'

import useConversation from '@/app/hooks/useConversation'
import EmptyState from '@/app/ui/EmptyState'

const Home = () => {
  const { isOpen } = useConversation()

  return (
    <div className={clsx('flex-1 h-full lg:block', isOpen ? 'block' : 'hidden')}>
      <EmptyState />
    </div>
  )
}

export default Home
