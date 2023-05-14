import serverAuth from "../../libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {

  try {
    const { currentUser } = await serverAuth()

    return NextResponse.json(currentUser)

  } catch (err) {
    return new NextResponse('INTERNAL ERROR', { status: 500 })
  }
}