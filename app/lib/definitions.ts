import { Conversation, Message, User } from '@prisma/client'

export type FullMessageType = Message & {
  sender: ClientUser
  seen: ClientUser[]
}

export type FullConversationType = Conversation & {
  users: ClientUser[]
  messages: FullMessageType[]
}

export type ClientUser = Pick<User, 'id' | 'name' | 'email' | 'image'>
