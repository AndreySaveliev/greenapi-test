'use client';
import React, { useState } from 'react';
import { Chat, User, recieveMessages, sentMessages } from '@prisma/client';
import Message from './Message';

interface ChatPageProps {
  selectedChat: Chat | undefined;
  user: User | null;
  messages: sentMessages[];
  resivedMessages: recieveMessages[];
}
const ChatPage: React.FC<ChatPageProps> = ({ selectedChat, user, messages, resivedMessages }) => {
  const [message, setMessage] = useState('');

  resivedMessages.map((message) => {
    message['resived'] = true;
  });

  const allMessages = messages.concat(resivedMessages).sort((a, b) => a.createdAt - b.createdAt);

  console.log(allMessages);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`https://api.green-api.com/waInstance${user.apiId}/SendMessage/${user.apiTokken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: `${selectedChat?.name}@c.us`,
        message: message
      })
    }).then(() => {
      fetch('../api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message, chatId: selectedChat?.id })
      });
    });
  };

  const handleMessagesCheck = () => {
    fetch(`https://api.green-api.com/waInstance${user.apiId}/ReceiveNotification/${user.apiTokken}`)
      .then((res) => res.json())
      .then((res) => {
        if (res == null) {
          return;
        }
        let dataForSave = res;
        if (res.body.senderData.sender === `${selectedChat?.name}@c.us`) {
          fetch(`../api/message/${selectedChat?.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: dataForSave.body.messageData.textMessageData.textMessage })
          }).then((res) => {
            // console.log(dataForSave);
            // console.log(res);
            fetch(
              `https://api.green-api.com/waInstance${user.apiId}/DeleteNotification/${user.apiTokken}/${dataForSave.receiptId}`,
              { method: 'DELETE' }
            );
          });
        }
      });
  };

  return (
    <div className="bg-slate-600 w-full flex flex-col items-center justify-between">
      <div className="mt-3">{selectedChat?.name}</div>
      <div className="w-full flex flex-col">
        <div className="items-center flex flex-col w-[80%] mx-auto">
          {allMessages.map((message) => (
            <Message key={message.id} message={message} right={message?.resived} />
          ))}
        </div>
        <form
          className="bg-slate-400 w-full justify-center flex flex-row mt-5 p-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className="mr-4 w-full text-black p-2"
            type="text"
            placeholder="ваше сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button className="w-fit h-full bg-slate-800 p-2" type="submit">
            Отправить
          </button>
        </form>
        <div className="my-3 ml-2 border-1">
          <button onClick={() => handleMessagesCheck()}>Проверить сообщения</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
