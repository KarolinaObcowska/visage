import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
  if (req.method === 'POST') {
    try {
      const emails = await req.json()
      const onlyEmails = emails.map((el) => el.email)
      const existingUsers = await prisma.users.findMany({
        where: {
          email: {
            in: onlyEmails,
          },
        },
      })

      const newUsers = emails.filter((email) => {
        return !existingUsers.some((user) => {
          return user.email === email.email
        })
      })
      if (!newUsers.length) {
        return NextResponse.json({ message: 'Wszyscy użytkownicy już istnieją' }, { status: 400 })
      }

      await prisma.users.createMany({
        data: [...newUsers],
      })
      if (newUsers.length && existingUsers.length) {
        return NextResponse.json({ message: `Dodano użytkowników: ${newUsers.toString()}, użytkownicy ${existingUsers.toString()} już istnieją w bazie danych` }, { status: 400 })
      } else {
        return NextResponse.json({ message: 'Użytkownicy zostali dodani', existingUsers, newUsers, status: 201 }, { status: 201 })
      }
    } catch (error) {
      return NextResponse.json({ message: error.message, status: 400 }, { status: 400 })
    }
  }
}
