
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      userType: string
      verified: boolean
      professional?: any
      company?: any
    }
  }

  interface User {
    id: string
    email: string
    name?: string
    userType: string
    verified: boolean
    professional?: any
    company?: any
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userType?: string
    verified?: boolean
    professional?: any
    company?: any
  }
}
