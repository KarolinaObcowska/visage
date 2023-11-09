import NextAuth from 'next-auth/next'
import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export const authOptions = {
  callbacks: {
    session: async ({ session, token }) => {
      session.user = token.user
      return session
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.authToken = user.authToken
        token.user = user
      }
      return token
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email', label: 'Email' },
        password: { type: 'password', label: 'Password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials

        if (!email || !password) {
          throw new Error('Missing username or password')
        }

        const user = await prisma.users.findUnique({
          where: {
            email,
          },
        })
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error('Invalid credentials')
        }
        return user
      },
    }),
  ],
  secre: 'secret',
  jwt: {
    secret: 'secret',
    maxAge: 2 * 60 * 60,
  },
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
