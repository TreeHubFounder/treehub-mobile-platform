
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const professionals = await prisma.treeProfessional.findMany({
      include: {
        user: true,
        skills: true,
        certifications: true,
        portfolio: true,
      },
      orderBy: [
        { verified: 'desc' },
        { rating: 'desc' },
        { totalJobs: 'desc' }
      ]
    });

    return NextResponse.json({ professionals });
  } catch (error) {
    console.error('Error fetching professionals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch professionals' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
