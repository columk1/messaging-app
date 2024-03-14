import { Conversation, Message, User } from '@prisma/client'

export type FullMessageType = Message & {
  sender: Pick<ClientUser, 'name' | 'email' | 'image'>
  seen: { email: string | null }[]
}

export type FullConversationType = Conversation & {
  users: ConversationUser[]
  messages: FullMessageType[]
}

export type ClientUser = Pick<User, 'id' | 'name' | 'email' | 'image'>
export type ConversationUser = Pick<User, 'id' | 'name' | 'email' | 'image' | 'createdAt'>
