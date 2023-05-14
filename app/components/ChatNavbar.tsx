'use client';

import React, { useCallback, useEffect, useState } from 'react';
import CreateChatPopup from './CreateChatPopup';
import ChatComponent from './ChatComponent';
import { useSession } from 'next-auth/react';
import { Chat } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface ChatNavbarProps {
  chats: Chat[];
  user: any;
  setSelectedChat: (arg0: Chat) => void;
}

const ChatNavbar: React.FC<ChatNavbarProps> = ({ chats, setSelectedChat, user }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [visible, setVisible] = useState(true);
  const router = useRouter()
  const session = useSession();
  const toggleCreateChat = useCallback(() => {
    setVisible((current) => !current);
  }, []);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const createdChat = await fetch('../api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: phoneNumber,
        email: session.data?.user?.email
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        setVisible(false);
        toggleCreateChat();
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  };

  

  return (
    <div className="w-80 bg-slate-900 h-screen flex flex-col items-center">
      <CreateChatPopup
        phoneNumber={phoneNumber}
        visible={visible}
        toggleCreateChat={toggleCreateChat}
        handleSumbit={handleSumbit}
        setPhoneNumber={setPhoneNumber}
      />
      <h2 className="font-semibold my-1">Список чатов</h2>
      <div className="h-screen">
        {chats?.map((chat) => (
          <div key={chat.id} onClick={() => router.push(`/messanger/${chat.id}`)}>
            <ChatComponent key={chat.id} chatInfo={chat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatNavbar;
