import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { FullConversationType } from '@/app/lib/definitions'

const useOtherUser = (conversation: FullConversationType) => {
  const session = useSession()

  const otherUser = useMemo(() => {
    const currentUserUsername = session.data?.user?.username
    const otherUser = conversation.users.filter((user) => user.username !== currentUserUsername)
    return otherUser[0]
  }, [session?.data?.user?.username, conversation.users])

  return otherUser
}

export default useOtherUser
