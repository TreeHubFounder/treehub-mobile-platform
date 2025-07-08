
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LovartCard, JobCard, CompanyCard } from '@/components/ui/card';
import { Badge, StatusBadge, PriceBadge } from '@/components/ui/badge';
import { SkillBadge, SkillList } from '@/components/skill-badge';
import { RatingDisplay } from '@/components/rating-display';
import { 
  Briefcase, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Plus,
  Bell,
  Award,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  // Mock data - would be fetched from database
  const stats = {
    activeJobs: 12,
    totalEarnings: 15420,
    completedJobs: 87,
    avgRating: 4.8,
    growthRate: 23
  };

  const recentJobs = [
    {
      id: 1,
      title: "Large Oak Tree Removal",
      company: "Green Valley Properties",
      location: "Austin, TX",
      budget: "$2,500 - $3,200",
      status: "in-progress",
      dueDate: "2024-01-15",
      urgency: "high",
      skills: ["Climber", "Crane Operator"]
    },
    {
      id: 2,
      title: "Storm Damage Assessment",
      company: "City Parks Department",
      location: "Houston, TX", 
      budget: "$150/hour",
      status: "pending",
      dueDate: "2024-01-20",
      urgency: "urgent",
      skills: ["Storm Response", "PHC Technician"]
    },
    {
      id: 3,
      title: "Pruning & Tree Health Care",
      company: "Residential Client",
      location: "Dallas, TX",
      budget: "$800 - $1,200",
      status: "open",
      dueDate: "2024-01-25",
      urgency: "normal",
      skills: ["PHC Technician", "Climber"]
    }
  ];

  const upcomingTasks = [
    { id: 1, task: "Complete safety inspection report", due: "Today", priority: "high" },
    { id: 2, task: "Submit equipment maintenance logs", due: "Tomorrow", priority: "medium" },
    { id: 3, task: "Renew ISA certification", due: "This week", priority: "high" },
    { id: 4, task: "Update portfolio with recent projects", due: "Next week", priority: "low" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero pb-20">
      <div className="container-enhanced section-spacing">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="animate-fade-in-up">
            <h1 className="heading-lg mb-2">
              Welcome back, <span className="text-lovart-primary font-semibold">{session.user?.name || 'Professional'}</span>
            </h1>
            <p className="body-md text-lovart-neutral">
              Here's what's happening with your tree care business today
            </p>
          </div>
          <div className="flex items-center gap-3 animate-slide-in-right">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Link href="/jobs/create">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Post Job
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <LovartCard className="p-4 text-center animate-fade-in-up">
            <div className="w-10 h-10 rounded-xl bg-lovart-primary/10 flex items-center justify-center mx-auto mb-3">
              <Briefcase className="h-5 w-5 text-lovart-primary" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.activeJobs}</div>
            <div className="text-xs text-lovart-neutral">Active Jobs</div>
          </LovartCard>

          <LovartCard className="p-4 text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-10 h-10 rounded-xl bg-lovart-orange/10 flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-5 w-5 text-lovart-orange" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">${stats.totalEarnings.toLocaleString()}</div>
            <div className="text-xs text-lovart-neutral">Total Earnings</div>
          </LovartCard>

          <LovartCard className="p-4 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.completedJobs}</div>
            <div className="text-xs text-lovart-neutral">Completed</div>
          </LovartCard>

          <LovartCard className="p-4 text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
              <Star className="h-5 w-5 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.avgRating}</div>
            <div className="text-xs text-lovart-neutral">Avg Rating</div>
          </LovartCard>

          <LovartCard className="p-4 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">+{stats.growthRate}%</div>
            <div className="text-xs text-lovart-neutral">Growth</div>
          </LovartCard>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-md">Recent Jobs</h2>
              <Link href="/jobs">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="card-spacing">
              {recentJobs.map((job, index) => (
                <JobCard key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="heading-sm">{job.title}</h3>
                        {job.urgency === 'urgent' && (
                          <StatusBadge status="urgent">
                            <AlertCircle className="h-3 w-3" />
                            Urgent
                          </StatusBadge>
                        )}
                      </div>
                      <p className="body-sm text-lovart-neutral mb-2">{job.company}</p>
                      <div className="flex items-center gap-4 text-xs text-lovart-neutral mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Due {job.dueDate}</span>
                        </div>
                      </div>
                      <SkillList skills={job.skills} maxVisible={2} size="sm" />
                    </div>
                    <div className="text-right">
                      <PriceBadge className="mb-2">{job.budget}</PriceBadge>
                      <StatusBadge status={job.status as any}>
                        {job.status === 'in-progress' ? 'In Progress' : 
                         job.status === 'pending' ? 'Pending' : 'Open'}
                      </StatusBadge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <Link href={`/jobs/${job.id}`}>
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                    </Link>
                    <Button size="sm" className="flex-1">
                      Update Status
                    </Button>
                  </div>
                </JobCard>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <LovartCard className="p-6 animate-fade-in-up">
              <h3 className="heading-sm mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/jobs/create">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-3" />
                    Post New Job
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-3" />
                    Update Profile
                  </Button>
                </Link>
                <Link href="/equipment">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-3" />
                    Browse Equipment
                  </Button>
                </Link>
              </div>
            </LovartCard>

            {/* Upcoming Tasks */}
            <LovartCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="heading-sm mb-4">Upcoming Tasks</h3>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{task.task}</p>
                      <p className="text-xs text-lovart-neutral">{task.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </LovartCard>

            {/* Professional Status */}
            <LovartCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="heading-sm mb-4">Professional Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-lovart-neutral">Profile Completion</span>
                  <span className="text-sm font-semibold text-gray-900">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-lovart-primary h-2 rounded-full" style={{ width: '87%' }} />
                </div>
                
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Identity Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Insurance Confirmed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span>Certification Pending</span>
                  </div>
                </div>
              </div>
            </LovartCard>
          </div>
        </div>
      </div>
    </div>
  );
}
