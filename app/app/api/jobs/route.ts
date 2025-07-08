
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const skills = searchParams.get('skills')?.split(',');
    const urgency = searchParams.get('urgency');
    const jobType = searchParams.get('jobType');

    const jobs = await prisma.treeJob.findMany({
      where: {
        status: 'OPEN',
        ...(location && {
          OR: [
            { city: { contains: location, mode: 'insensitive' } },
            { state: { contains: location, mode: 'insensitive' } }
          ]
        }),
        ...(skills && skills.length > 0 && {
          skillsRequired: {
            hasSome: skills as any[]
          }
        }),
        ...(urgency && { urgency: urgency as any }),
        ...(jobType && { jobType: jobType as any })
      },
      include: {
        company: {
          include: {
            user: true
          }
        },
        applications: {
          select: {
            id: true
          }
        }
      },
      orderBy: [
        { urgency: 'desc' },
        { postedAt: 'desc' }
      ]
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const job = await prisma.treeJob.create({
      data: {
        title: data.title,
        description: data.description,
        companyId: data.companyId,
        jobType: data.jobType,
        urgency: data.urgency,
        skillsRequired: data.skillsRequired,
        payType: data.payType,
        payAmount: parseFloat(data.payAmount),
        overtimeRate: data.overtimeRate ? parseFloat(data.overtimeRate) : null,
        hazardPay: data.hazardPay ? parseFloat(data.hazardPay) : null,
        equipmentProvided: data.equipmentProvided,
        equipmentRequired: data.equipmentRequired || [],
        safetyRequirements: data.safetyRequirements || [],
        certificationRequired: data.certificationRequired || [],
        weatherDependent: data.weatherDependent,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        gateWidth: data.gateWidth ? parseFloat(data.gateWidth) : null,
        powerLines: data.powerLines,
        slope: data.slope,
        obstacles: data.obstacles || [],
        parking: data.parking,
      },
      include: {
        company: {
          include: {
            user: true
          }
        }
      }
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
