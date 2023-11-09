import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req) {
  if (req.method === 'POST') {
    try {
      const data = await req.json()
      const hashedPassword = await bcrypt.hash(data.password, 10)
      await prisma.users.update({
        where: {
          email: data.email,
        },
        data: {
          password: hashedPassword,
        },
      })

      return NextResponse.json({ message: 'Hasło zostało utworzone', status: 200 }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ message: error.message, status: 400 }, { status: 400 })
    }
  }
}
