import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req, res) {
  if (req.method === 'POST') {
    try {
      const data = await req.json()

      const user = await prisma.users.findMany({
        where: {
          email: data.email,
        },
      })
      const newHashedPassword = await bcrypt.hash(data.newPassword, 10)

      if (user[0] && (await bcrypt.compare(data.currentPassword, user[0].password))) {
        await prisma.users.update({
          where: {
            email: data.email,
          },
          data: {
            password: newHashedPassword,
          },
        })
      } else {
        return NextResponse.json({ message: 'Podane hasło jest nieprawidłowe', status: 400 }, { status: 400 })
      }
      return NextResponse.json({ message: 'Hasło zostało zmienione', status: 200 }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ message: error.message, status: 400 }, { status: 400 })
    }
  }
}
