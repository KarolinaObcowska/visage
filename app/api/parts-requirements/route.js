import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
  if (req.method === 'POST') {
    try {
      const data = await req.json()
      await prisma.orders.create({
        data: {
          user: {
            connect: {
              email: data.id,
            },
          },
          orderItems: {
            create: data.orderItems,
          },
          order_date: data.order_date,
        },
      })
      return NextResponse.json({ message: 'Zamówienie zostało dodane', status: 201 }, { status: 201 })
    } catch (error) {
      return NextResponse.json({ message: error.message, status: 400 }, { status: 400 })
    }
  }
}
