import { Chat } from '@prisma/client';
import React from 'react';

interface ChatProps {
  chatInfo: Chat
}

const ChatComponent: React.FC<ChatProps> = ({ chatInfo }) => {
  return (
    <div className="w-full h-10 border-b-2 border-slate-400 text-center align-bottom hover:cursor-pointer hover:bg-slate-500">
      {chatInfo.name}
    </div>
  );
};

export default ChatComponent;
