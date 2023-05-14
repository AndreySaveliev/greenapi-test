import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    if (request.method === "POST") {
      const body = await request.json()
      const { message, chatId } = body

      if (!message || !chatId) {
        return new NextResponse('Missing email, name or password', { status: 400 })
      }

      const chat = await prisma.sentMessages.create({
        data: {
          body: message,
          chat: {
            connect: { id: chatId }
          }
        }
      });

      return NextResponse.json(chat)

    }
  } catch (err) {
    console.log(err)
    return new NextResponse('INTERNAL ERROR', { status: 500 })
  }
}