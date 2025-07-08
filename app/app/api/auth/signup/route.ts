
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, userType } = await request.json();

    // Validate input
    if (!name || !email || !password || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        userType: userType as any,
        verified: false,
      }
    });

    // Create account record for NextAuth
    await prisma.account.create({
      data: {
        userId: user.id,
        type: 'credentials',
        provider: 'credentials',
        providerAccountId: user.id,
      }
    });

    // Create profile based on user type
    if (userType === 'PROFESSIONAL') {
      await prisma.treeProfessional.create({
        data: {
          userId: user.id,
          rating: 0,
          totalJobs: 0,
          verified: false,
          insured: false,
          availability: 'AVAILABLE',
        }
      });
    } else if (userType === 'COMPANY') {
      await prisma.treeCompany.create({
        data: {
          userId: user.id,
          name: name,
          size: 'SMALL',
          employees: 0,
          verified: false,
          rating: 0,
          totalJobs: 0,
        }
      });
    }

    // Store hashed password separately (for demo purposes)
    // In production, you'd use a proper authentication provider
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS user_credentials (
        id SERIAL PRIMARY KEY,
        user_id TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await prisma.$executeRaw`
      INSERT INTO user_credentials (user_id, password_hash) 
      VALUES (${user.id}, ${hashedPassword})
      ON CONFLICT (user_id) DO UPDATE SET password_hash = ${hashedPassword}
    `;

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
