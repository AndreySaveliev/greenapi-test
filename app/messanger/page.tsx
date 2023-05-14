'use client'
import React, { useState } from 'react';
import ChatPage from '../components/ChatPage';
import ChatNavbar from '../components/ChatNavbar';
import { Chat, User } from '@prisma/client';

interface MessangeraProps {
  chats: Chat[],
  user: User | null,
  messages: {}
}

const Messanger: React.FC<MessangeraProps> = ({chats, user, messages}) => {

  const [selectedChat, setSelectedChat] = useState<Chat>()


  return (
      <div className="w-full flex flex-row">
        {/* <ChatNavbar chats={chats} setSelectedChat={setSelectedChat} user={user} /> */}
      </div>
  );
};

export default Messanger;
