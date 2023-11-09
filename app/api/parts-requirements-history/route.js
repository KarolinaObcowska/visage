import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(req, res) {
  try {
    const session = await getServerSession(authOptions)
    let orders
    if (session?.user.role === 'user') {
      orders = await prisma.orders.findMany({
        where: {
          id: session.user.id,
        },
        include: {
          orderItems: true,
        },
      })
    } else {
      orders = await prisma.orders.findMany({
        include: {
          orderItems: true,
        },
      })
    }

    return NextResponse.json({ orders, status: 200 }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ orders, status: 400 }, { status: 400 })
  }
}
