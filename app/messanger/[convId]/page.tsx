import ChatPage from '@/app/components/ChatPage'
import useChats from '@/app/hooks/useChats'
import useMessages from '@/app/hooks/useMessages'
import useUser from '@/app/hooks/useUser'
import React from 'react'

const Chat = async ({params}: {params: string}) => {

  const user = await useUser()
  const messages = await useMessages(params, true)
  const resivedMessages = await useMessages(params, false)
  const chats = await useChats()

  let chatData
  chats.forEach((chat) => {
    if (chat.id === params.convId) {
      chatData = chat
    }
  })

  return (
    <div className='flex w-full'>
      <ChatPage selectedChat={chatData} user={user} messages={messages} resivedMessages={resivedMessages}/>
    </div>
  )
}

export default Chat