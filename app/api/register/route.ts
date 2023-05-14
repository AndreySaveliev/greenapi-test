import bcrypt from "bcrypt";
import prisma from '@/app/libs/prismadb';
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {

    const body = await request.json()
    const { email, name, password, apiId, apiTokken } = body

    if (!email || !name || !password || !apiId || !apiTokken) {
      return new NextResponse('Missing email, name or password', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { email, name, hashedPassword, apiId, apiTokken }
    })

    return NextResponse.json(user)
  } catch (err) {
    console.log(err)
    return new NextResponse('INTERNAL ERROR', { status: 500 })
  }
}