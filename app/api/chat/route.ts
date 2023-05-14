
import prisma from '@/app/libs/prismadb';

import { NextResponse } from "next/server";

export async function POST(request: Request ) {
  try {
    if (request.method === "POST") {
      const body = await request.json()
      const { name, email } = body

      if (!name || !email) {
        return new NextResponse('Missing email, name or password', { status: 400 })
      }

      const chat = await prisma.chat.create({
        data: {
          name, user: {
            connect: { email: email }
          }
        },
      });

      return NextResponse.json(chat);

    }
  } catch (err) {
    console.log(err)
    return new NextResponse('INTERNAL ERROR', { status: 500 })
  }
}


