import { sentMessages } from '@prisma/client';
import useChats from './useChats';
import prisma from '@/app/libs/prismadb'
const useMessages = async (chatId, isMine) => {

  const chats = await useChats()

  if (!chats) {
    return [];
  }

  try {
    let messages

    if (isMine == true) {
      messages = await prisma.sentMessages.findMany({
        where: {
          chatId: chatId.convId
        }
      })
    }

    if (isMine == false) {
      messages = await prisma.recieveMessages.findMany({
        where: {
          chatId: chatId.convId
        }
      })
    }
    return messages;

  } catch (error: any) {
    console.log(error)
    return [];
  }
}

export default useMessages