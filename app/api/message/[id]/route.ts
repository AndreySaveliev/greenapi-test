

import prisma from '@/app/libs/prismadb';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { chatId: string } }) {

  try {
    if (request.method === "POST") {

      const { body } = request

      const message = await prisma.recieveMessages.create({
        data: {
          body: body.data,
          chat: {
            connect: {id: params.chatId}
          }
            
        }
      })

      return NextResponse.json(message)

    }
  } catch (err) {
    return new NextResponse(null)
  }

}