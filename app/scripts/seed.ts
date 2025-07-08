
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌳 Seeding TreeHub database...');

  // Create demo account (admin professional)
  const demoPassword = await bcrypt.hash('johndoe123', 12);
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      userType: 'PROFESSIONAL',
      verified: true,
    }
  });

  // Store demo user credentials
  // Create credentials table if it doesn't exist
  try {
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS user_credentials (
        id SERIAL PRIMARY KEY,
        user_id TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  } catch (error) {
    console.log('Note: user_credentials table may already exist');
  }

  // Insert demo user credentials
  try {
    await prisma.$executeRaw`
      INSERT INTO user_credentials (user_id, password_hash) 
      VALUES (${demoUser.id}, ${demoPassword})
      ON CONFLICT (user_id) DO UPDATE SET password_hash = ${demoPassword}
    `;
  } catch (error) {
    console.log('Note: Could not store demo credentials:', error);
  }

  const demoProfessional = await prisma.treeProfessional.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      phone: '+1 (555) 123-4567',
      bio: 'Certified arborist with 15+ years of experience in tree climbing, removal, and storm response. ISA certified with extensive background in emergency tree work.',
      experience: 15,
      hourlyRate: 45,
      rating: 4.8,
      totalJobs: 247,
      verified: true,
      insured: true,
      availability: 'AVAILABLE',
      locationCity: 'Austin',
      locationState: 'TX',
      locationZipCode: '78701',
      latitude: 30.2672,
      longitude: -97.7431,
    }
  });

  // Add skills for demo professional
  const skills = [
    { skillType: 'CLIMBER', name: 'Advanced Tree Climbing', level: 'EXPERT', yearsExperience: 15, verified: true },
    { skillType: 'STORM_RESPONSE', name: 'Emergency Storm Response', level: 'EXPERT', yearsExperience: 12, verified: true },
    { skillType: 'TREE_REMOVAL', name: 'Complex Tree Removal', level: 'EXPERT', yearsExperience: 15, verified: true },
    { skillType: 'ARBORIST', name: 'ISA Certified Arborist', level: 'MASTER', yearsExperience: 10, verified: true },
  ];

  for (const skill of skills) {
    await prisma.professionalSkill.upsert({
      where: {
        professionalId_skillType: {
          professionalId: demoProfessional.id,
          skillType: skill.skillType as any
        }
      },
      update: {},
      create: {
        professionalId: demoProfessional.id,
        skillType: skill.skillType as any,
        name: skill.name,
        level: skill.level as any,
        yearsExperience: skill.yearsExperience,
        verified: skill.verified,
      }
    });
  }

  // Add certifications
  const certifications = [
    {
      name: 'ISA Certified Arborist',
      issuer: 'International Society of Arboriculture',
      number: 'TX-4521A',
      issueDate: new Date('2015-03-15'),
      expirationDate: new Date('2025-03-15'),
      verified: true
    },
    {
      name: 'TCIA Tree Care Safety Professional',
      issuer: 'Tree Care Industry Association',
      number: 'TCSP-892',
      issueDate: new Date('2018-06-20'),
      expirationDate: new Date('2026-06-20'),
      verified: true
    }
  ];

  for (const cert of certifications) {
    await prisma.certification.create({
      data: {
        professionalId: demoProfessional.id,
        ...cert
      }
    });
  }

  // Create sample companies and jobs
  const companies = [
    {
      name: 'Apex Tree Services',
      email: 'info@apextreeservices.com',
      description: 'Professional tree care specialists serving Austin and surrounding areas for over 20 years.',
      size: 'MEDIUM' as const,
      employees: 25,
      founded: 2003,
      city: 'Austin',
      state: 'TX'
    },
    {
      name: 'Metro Tree Care',
      email: 'contact@metrotreecare.com', 
      description: 'Full-service tree care company specializing in residential and commercial properties.',
      size: 'LARGE' as const,
      employees: 45,
      founded: 1998,
      city: 'Denver',
      state: 'CO'
    },
    {
      name: 'GreenLeaf Solutions',
      email: 'hello@greenleafsolutions.com',
      description: 'Sustainable tree care and plant health care specialists.',
      size: 'SMALL' as const,
      employees: 12,
      founded: 2010,
      city: 'Portland',
      state: 'OR'
    }
  ];

  const createdCompanies = [];
  for (const companyData of companies) {
    const companyUser = await prisma.user.create({
      data: {
        email: companyData.email,
        name: companyData.name,
        userType: 'COMPANY',
        verified: true,
      }
    });

    const company = await prisma.treeCompany.create({
      data: {
        userId: companyUser.id,
        name: companyData.name,
        description: companyData.description,
        size: companyData.size,
        employees: companyData.employees,
        founded: companyData.founded,
        verified: true,
        rating: 4.2 + Math.random() * 0.8,
        totalJobs: Math.floor(Math.random() * 500) + 100,
        locationCity: companyData.city,
        locationState: companyData.state,
        locationZipCode: '12345',
      }
    });

    createdCompanies.push(company);
  }

  // Create sample jobs
  const sampleJobs = [
    {
      title: 'Tree Climber - Storm Cleanup',
      description: 'Immediate need for experienced tree climber to assist with storm cleanup operations. Multiple large oak trees requiring careful dismantling due to storm damage. Must have own climbing gear and be comfortable with complex rigging operations.',
      companyId: createdCompanies[0].id,
      jobType: 'CONTRACT' as const,
      urgency: 'URGENT' as const,
      skillsRequired: ['CLIMBER', 'STORM_RESPONSE', 'TREE_REMOVAL'],
      payType: 'HOURLY' as const,
      payAmount: 42,
      overtimeRate: 63,
      hazardPay: 10,
      equipmentProvided: false,
      address: '1234 Oak Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      weatherDependent: true,
      gateWidth: 8,
      powerLines: true,
      slope: 'MODERATE' as const,
      parking: 'STREET' as const,
    },
    {
      title: 'Crane Operator - Large Removal',
      description: 'Seeking experienced crane operator for large tree removal project. 80ft+ oak tree in tight residential setting. NCCCO certification preferred. Project duration 2-3 days.',
      companyId: createdCompanies[1].id,
      jobType: 'CONTRACT' as const,
      urgency: 'NORMAL' as const,
      skillsRequired: ['CRANE_OPERATOR', 'TREE_REMOVAL'],
      payType: 'HOURLY' as const,
      payAmount: 58,
      overtimeRate: 87,
      equipmentProvided: true,
      address: '5678 Pine Avenue',
      city: 'Denver',
      state: 'CO',
      zipCode: '80201',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      weatherDependent: true,
      gateWidth: 12,
      powerLines: false,
      slope: 'FLAT' as const,
      parking: 'DRIVEWAY' as const,
    },
    {
      title: 'PHC Technician - Treatment Program',
      description: 'Plant Health Care technician needed for comprehensive tree treatment program. Responsibilities include soil analysis, pest identification, and treatment application. Must have pesticide applicator license.',
      companyId: createdCompanies[2].id,
      jobType: 'PART_TIME' as const,
      urgency: 'NORMAL' as const,
      skillsRequired: ['PHC_TECH', 'DIAGNOSIS'],
      payType: 'HOURLY' as const,
      payAmount: 32,
      equipmentProvided: true,
      address: '9012 Elm Street',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      weatherDependent: false,
      gateWidth: 6,
      powerLines: false,
      slope: 'FLAT' as const,
      parking: 'STREET' as const,
    },
    {
      title: 'Ground Crew - Residential Services',
      description: 'Multiple positions available for ground crew members. Duties include debris cleanup, equipment operation (chipper, stump grinder), and general labor. Entry level positions available with training provided.',
      companyId: createdCompanies[0].id,
      jobType: 'FULL_TIME' as const,
      urgency: 'NORMAL' as const,
      skillsRequired: ['GROUNDWORK'],
      payType: 'HOURLY' as const,
      payAmount: 18,
      overtimeRate: 27,
      equipmentProvided: true,
      address: '3456 Maple Drive',
      city: 'Austin',
      state: 'TX',
      zipCode: '78702',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
      weatherDependent: true,
      gateWidth: 8,
      powerLines: false,
      slope: 'FLAT' as const,
      parking: 'DRIVEWAY' as const,
    },
    {
      title: 'Emergency Storm Response Team',
      description: 'URGENT: Major storm system approaching. Need certified climbers and ground crew for 24/7 storm response operations. Hazard pay and overtime available. Must be available for immediate deployment.',
      companyId: createdCompanies[1].id,
      jobType: 'STORM_EMERGENCY' as const,
      urgency: 'EMERGENCY' as const,
      skillsRequired: ['CLIMBER', 'STORM_RESPONSE', 'EMERGENCY_RESPONSE'],
      payType: 'HOURLY' as const,
      payAmount: 55,
      overtimeRate: 82,
      hazardPay: 20,
      equipmentProvided: true,
      address: 'Various Locations',
      city: 'Denver',
      state: 'CO', 
      zipCode: '80202',
      startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
      weatherDependent: false,
      gateWidth: 0,
      powerLines: true,
      slope: 'STEEP' as const,
      parking: 'LIMITED' as const,
    }
  ];

  for (const jobData of sampleJobs) {
    await prisma.treeJob.create({
      data: {
        ...jobData,
        skillsRequired: jobData.skillsRequired as any[],
        equipmentRequired: ['Safety gear', 'Work boots'],
        safetyRequirements: ['Hard hat', 'Eye protection', 'Cut-resistant chaps'],
        certificationRequired: jobData.skillsRequired.includes('CRANE_OPERATOR') ? ['NCCCO Certification'] : [],
        obstacles: ['Fence', 'Garden beds'],
      }
    });
  }

  // Create sample equipment listings
  const equipmentListings = [
    {
      name: 'Stihl MS 661 Chainsaw',
      category: 'CHAINSAWS' as const,
      brand: 'Stihl',
      model: 'MS 661',
      year: 2022,
      condition: 'EXCELLENT' as const,
      price: 1200,
      dailyRentalRate: 85,
      forSale: true,
      forRent: true,
      location: 'Austin, TX',
      description: 'Professional grade chainsaw, low hours, well maintained. Perfect for large tree work.',
      professionalId: demoProfessional.id,
    },
    {
      name: 'Bandit BC-600 Chipper',
      category: 'CHIPPERS' as const,
      brand: 'Bandit',
      model: 'BC-600',
      year: 2020,
      condition: 'GOOD' as const,
      dailyRentalRate: 250,
      weeklyRentalRate: 1500,
      forRent: true,
      location: 'Denver, CO',
      description: '6" capacity chipper, trailer mounted, reliable operation.',
      companyId: createdCompanies[1].id,
    },
    {
      name: 'Altec Bucket Truck',
      category: 'BUCKET_TRUCKS' as const,
      brand: 'Altec',
      model: 'AT37G',
      year: 2018,
      condition: 'GOOD' as const,
      price: 75000,
      forSale: true,
      location: 'Portland, OR',
      description: '37ft working height, well maintained fleet vehicle, ready for work.',
      companyId: createdCompanies[2].id,
    }
  ];

  for (const equipment of equipmentListings) {
    await prisma.equipment.create({
      data: {
        ...equipment,
        images: ['https://images.unsplash.com/photo-1581578917473-c5f59b1b46dd?w=800'],
      }
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('🔑 Demo account: john@doe.com / johndoe123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
