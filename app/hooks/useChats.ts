import useUser from './useUser';
import prisma from '@/app/libs/prismadb'
const useChats = async () => {

  const user = await useUser()

  if (!user?.id) {
    return [];
  }

  try {
    const conversations = await prisma.chat.findMany({
      where: {
        userEmail: user.email,
      }
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
}

export default useChats