
import prisma from '@/app/libs/prismadb';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextApiRequest, { params }: { params: { userId: string } }) {

  try {
    if (request.method === "GET") {

      const chats = await prisma.chat.findMany({
        where: {
          userId: params.userId,
        }
      })

      if (!chats) {
        return new NextResponse('invalid id', { status: 400 })
      }

      return NextResponse.json(chats)

    }
  } catch (err) {
    return new NextResponse(null)
  }

}
