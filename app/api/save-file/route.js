import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req, res) {
  if (req.method === 'POST') {
    const data = await req.json()
    const isFileSaved = await prisma.excelFile.findMany([])

    if (isFileSaved.length) {
      await prisma.excelFile.update({
        where: {
          id: isFileSaved[0].id,
        },
        data: {
          content: data,
        },
      })
    } else {
      await prisma.excelFile.create({
        data: {
          name: 'parts',
          content: data,
        },
      })
    }

    return NextResponse.json({ message: 'Plik został dodany', status: 201 }, { status: 201 })
  }
}
