import { Conversation, Message, User } from '@prisma/client'

export type FullMessageType = Message & {
  sender: Pick<ClientUser, 'name' | 'username' | 'image'>
  seen: { username: string | null }[]
}

export type FullConversationType = Conversation & {
  users: ConversationUser[]
  messages: FullMessageType[]
}

export type ClientUser = Pick<User, 'id' | 'name' | 'username' | 'image'>
export type ConversationUser = Pick<User, 'id' | 'name' | 'username' | 'image' | 'createdAt'>
