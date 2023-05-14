
import prisma from '@/app/libs/prismadb';
import { NextResponse } from "next/server";

export default async function POST(request: Request) {

  try {
    if (request.method === "POST") {
      const body = await request.json()
      const { email } = body
      
      if (!email) {
        return new NextResponse('Missing email, name or password', { status: 400 })
    } 

    const user = await prisma.user.findUnique({
      where: { 
        email: email
      }
    })
    
    return NextResponse.json(user)
   }
  } catch (err) {
    console.log(err)
    return new NextResponse('INTERNAL ERROR', { status: 500 })
  }
}