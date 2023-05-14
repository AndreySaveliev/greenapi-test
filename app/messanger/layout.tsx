import React from 'react';
import useUser from '../hooks/useUser';
import useChats from '../hooks/useChats';
import Messanger from './page';
import useMessages from '../hooks/useMessages';
import ChatNavbar from '../components/ChatNavbar';

const Layout = async ({children}: {children: React.ReactNode}) => {
  const user = await useUser()
  const chats = await useChats()

  return (
      <div className="w-full flex flex-row">
        <ChatNavbar chats={chats} user={user} />
        {children}
      </div>
  );
};

export default Layout;
