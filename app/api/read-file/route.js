import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req, res) {
  const file = await prisma.excelFile.findMany()

  return NextResponse.json({ message: 'OK', file: file[0], status: 200 }, { status: 201 })
}
