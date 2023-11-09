import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const users = await prisma.users.findMany()
    const usersWithoutPasswords = users.map((user) => {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return NextResponse.json({ message: 'OK', users: usersWithoutPasswords, status: 200 }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 400 }, { status: 400 })
  }
}
