
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LovartCard, JobCard } from '@/components/ui/card';
import { Badge, StatusBadge, PriceBadge } from '@/components/ui/badge';
import { SkillBadge, SkillList } from '@/components/skill-badge';
import { RatingDisplay } from '@/components/rating-display';
import { prisma } from '@/lib/db';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  Star,
  ArrowLeft,
  Send,
  Bookmark,
  Share2,
  AlertTriangle,
  CheckCircle,
  User,
  Building,
  Phone,
  Mail,
  Shield,
  Award
} from 'lucide-react';

interface JobPageProps {
  params: {
    id: string;
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const session = await getServerSession(authOptions);
  
  const job = await prisma.treeJob.findUnique({
    where: { id: params.id },
    include: {
      company: {
        include: {
          user: true,
        },
      },
      applications: {
        include: {
          professional: {
            include: {
              user: true,
            },
          },
        },
      },
      reviews: {
        include: {
          reviewerUser: true,
          reviewerProfessional: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  if (!job) {
    notFound();
  }

  // Mock additional data that would be calculated
  const applicationsCount = job.applications.length;
  const averageProposalAmount = job.payAmount; // Simplified for demo
  const companyJobsCount = 45; // Mock data
  const companyRating = 4.7; // Mock data

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'EMERGENCY': return 'bg-red-500 text-white';
      case 'URGENT': return 'bg-orange-500 text-white';
      case 'NORMAL': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-green-500 text-white';
      case 'IN_PROGRESS': return 'bg-blue-500 text-white';
      case 'COMPLETED': return 'bg-gray-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const formatSkillType = (skill: string) => {
    switch (skill) {
      case 'CLIMBER': return 'Climber';
      case 'GROUNDWORK': return 'Groundwork';
      case 'CRANE_OPERATOR': return 'Crane Operator';
      case 'PHC_TECH': return 'PHC Technician';
      case 'STORM_RESPONSE': return 'Storm Response';
      case 'ARBORIST': return 'Certified Arborist';
      default: return skill.replace(/_/g, ' ');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero pb-20">
      <div className="container-enhanced section-spacing">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in-up">
          <Link href="/jobs">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <LovartCard className="animate-fade-in-up">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="heading-lg">{job.title}</h1>
                    {job.company.verified && (
                      <Badge variant="success" className="text-xs">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <Link href={`/companies/${job.company.id}`}>
                      <span className="body-lg text-lovart-primary hover:underline font-medium">
                        {job.company.name}
                      </span>
                    </Link>
                    <RatingDisplay rating={companyRating} reviewCount={156} size="sm" />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-lovart-neutral">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.address}, {job.city}, {job.state}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Due {new Date(job.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{applicationsCount} applicants</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-3">
                    <StatusBadge className={getUrgencyColor(job.urgency)}>
                      {job.urgency}
                    </StatusBadge>
                    <StatusBadge className={getStatusColor(job.status)}>
                      {job.status.replace('_', ' ')}
                    </StatusBadge>
                  </div>
                  <PriceBadge className="text-xl font-bold">
                    ${job.payAmount.toLocaleString()}{job.payType === 'HOURLY' ? '/hour' : ''}
                  </PriceBadge>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="heading-sm mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill: string, index: number) => (
                    <SkillBadge key={index} skill={formatSkillType(skill)} />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {session && (
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                  <Button className="flex-1 min-w-[200px]">
                    <Send className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                  <Button variant="outline">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              )}
            </LovartCard>

            {/* Job Description */}
            <LovartCard className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="heading-sm mb-4">Job Description</h3>
              <div className="prose prose-sm max-w-none">
                <p className="body-md text-lovart-neutral whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>
            </LovartCard>

            {/* Requirements */}
            <LovartCard className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="heading-sm mb-4">Requirements</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-lovart-forest mb-2">Safety Requirements</h4>
                  <ul className="space-y-1">
                    {job.safetyRequirements.map((requirement: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-lovart-neutral">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {job.equipmentRequired.length > 0 && (
                  <div>
                    <h4 className="font-medium text-lovart-forest mb-2">Equipment Required</h4>
                    <ul className="space-y-1">
                      {job.equipmentRequired.map((equipment: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-lovart-neutral">
                          <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                          <span>{equipment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.certificationRequired.length > 0 && (
                  <div>
                    <h4 className="font-medium text-lovart-forest mb-2">Certifications Required</h4>
                    <ul className="space-y-1">
                      {job.certificationRequired.map((cert: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-lovart-neutral">
                          <Award className="h-4 w-4 text-amber-500 flex-shrink-0" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </LovartCard>

            {/* Location & Accessibility */}
            <LovartCard className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="heading-sm mb-4">Location & Site Details</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-lovart-forest mb-2">Address</h4>
                  <p className="text-sm text-lovart-neutral">{job.address}</p>
                  <p className="text-sm text-lovart-neutral">{job.city}, {job.state} {job.zipCode}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-lovart-forest mb-2">Site Conditions</h4>
                  <div className="space-y-2">
                    {job.gateWidth && (
                      <div className="flex justify-between text-sm">
                        <span className="text-lovart-neutral">Gate Width:</span>
                        <span className="font-medium">{job.gateWidth}"</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-lovart-neutral">Power Lines:</span>
                      <span className="font-medium">{job.powerLines ? 'Present' : 'None'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-lovart-neutral">Slope:</span>
                      <span className="font-medium">{job.slope}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-lovart-neutral">Parking:</span>
                      <span className="font-medium">{job.parking}</span>
                    </div>
                  </div>
                </div>
              </div>

              {job.obstacles.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-medium text-lovart-forest mb-2">Obstacles & Considerations</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.obstacles.map((obstacle: string, index: number) => (
                      <Badge key={index} variant="warning" className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {obstacle}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </LovartCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <LovartCard className="animate-fade-in-up">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-lovart-primary text-white flex items-center justify-center font-bold text-lg">
                  {job.company.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-lovart-forest">{job.company.name}</h3>
                  <div className="flex items-center gap-2">
                    <RatingDisplay rating={companyRating} reviewCount={156} size="sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-lovart-neutral">Total Jobs Posted:</span>
                  <span className="font-medium">{companyJobsCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-lovart-neutral">Company Size:</span>
                  <span className="font-medium">{job.company.size}</span>
                </div>
                {job.company.founded && (
                  <div className="flex justify-between text-sm">
                    <span className="text-lovart-neutral">Founded:</span>
                    <span className="font-medium">{job.company.founded}</span>
                  </div>
                )}
              </div>

              <Link href={`/companies/${job.company.id}`}>
                <Button variant="outline" className="w-full">
                  <Building className="h-4 w-4 mr-2" />
                  View Company Profile
                </Button>
              </Link>
            </LovartCard>

            {/* Job Stats */}
            <LovartCard className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="heading-sm mb-4">Job Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-lovart-neutral">Applications:</span>
                  <span className="font-semibold text-lovart-forest">{applicationsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-lovart-neutral">Average Proposal:</span>
                  <span className="font-semibold text-lovart-forest">${averageProposalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-lovart-neutral">Job Type:</span>
                  <span className="font-semibold text-lovart-forest">{job.jobType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-lovart-neutral">Equipment Provided:</span>
                  <span className="font-semibold text-lovart-forest">{job.equipmentProvided ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </LovartCard>

            {/* Similar Jobs */}
            <LovartCard className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="heading-sm mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                {/* Mock similar jobs */}
                {[
                  { title: "Tree Pruning - Residential", company: "Green Canopy", budget: "$800", location: "Austin, TX" },
                  { title: "Storm Cleanup", company: "Emergency Tree", budget: "$2,400", location: "Houston, TX" },
                  { title: "Oak Tree Removal", company: "Professional Trees", budget: "$1,500", location: "Dallas, TX" }
                ].map((similarJob, index) => (
                  <div key={index} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                    <h4 className="font-medium text-sm text-lovart-forest mb-1">{similarJob.title}</h4>
                    <p className="text-xs text-lovart-neutral mb-2">{similarJob.company}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-lovart-neutral">{similarJob.location}</span>
                      <span className="text-xs font-semibold text-lovart-primary">{similarJob.budget}</span>
                    </div>
                  </div>
                ))}
              </div>
            </LovartCard>
          </div>
        </div>
      </div>
    </div>
  );
}
