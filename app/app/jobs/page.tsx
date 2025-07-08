
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input, SearchInput } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobCard, LovartCard } from '@/components/ui/card';
import { Badge, StatusBadge, PriceBadge } from '@/components/ui/badge';
import { SkillBadge, SkillList } from '@/components/skill-badge';
import { RatingDisplay } from '@/components/rating-display';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock,
  Star,
  Briefcase,
  Plus,
  TrendingUp,
  AlertCircle,
  Users,
  ArrowRight
} from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  companyRating: number;
  location: string;
  budget: string;
  budgetType: 'fixed' | 'hourly';
  description: string;
  skills: string[];
  urgency: 'low' | 'normal' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'completed';
  postedDate: string;
  dueDate: string;
  applicants: number;
  verified: boolean;
}

export default function JobsPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === 'all' || job.location.includes(locationFilter);
    const matchesSkill = skillFilter === 'all' || job.skills.includes(skillFilter);
    
    return matchesSearch && matchesLocation && matchesSkill;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'normal': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getBudgetRange = (budget: string) => {
    if (budget.includes('/hour')) return 'hourly';
    if (budget.includes('$')) return 'fixed';
    return 'negotiable';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container-enhanced section-spacing">
          <div className="grid gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="loading-skeleton-enhanced h-48 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero pb-20">
      <div className="container-enhanced">
        {/* Header */}
        <div className="section-spacing">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div className="animate-fade-in-up">
              <h1 className="heading-lg mb-2">
                Tree Care <span className="text-lovart-primary">Jobs</span>
              </h1>
              <p className="body-md text-lovart-neutral">
                Discover opportunities from verified companies and property owners
              </p>
            </div>
            
            {session && (
              <div className="flex items-center gap-3 animate-slide-in-right">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Saved Jobs
                </Button>
                <Link href="/jobs/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post Job
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <LovartCard className="p-4 text-center animate-fade-in-up">
              <div className="w-10 h-10 rounded-xl bg-lovart-primary/10 flex items-center justify-center mx-auto mb-2">
                <Briefcase className="h-5 w-5 text-lovart-primary" />
              </div>
              <div className="text-xl font-bold text-lovart-forest">{jobs.length}</div>
              <div className="text-xs text-lovart-neutral">Active Jobs</div>
            </LovartCard>

            <LovartCard className="p-4 text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-10 h-10 rounded-xl bg-lovart-orange/10 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-5 w-5 text-lovart-orange" />
              </div>
              <div className="text-xl font-bold text-lovart-forest">23</div>
              <div className="text-xs text-lovart-neutral">Posted Today</div>
            </LovartCard>

            <LovartCard className="p-4 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="text-xl font-bold text-lovart-forest">$2.1k</div>
              <div className="text-xs text-lovart-neutral">Avg Budget</div>
            </LovartCard>

            <LovartCard className="p-4 text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-2">
                <Star className="h-5 w-5 text-amber-600" />
              </div>
              <div className="text-xl font-bold text-lovart-forest">4.7</div>
              <div className="text-xs text-lovart-neutral">Avg Rating</div>
            </LovartCard>
          </div>

          {/* Search and Filters */}
          <LovartCard className="p-6 mb-8 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="search-bar-enhanced">
                  <Search className="h-5 w-5 text-lovart-neutral" />
                  <SearchInput
                    placeholder="Search jobs, companies, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Austin">Austin, TX</SelectItem>
                  <SelectItem value="Houston">Houston, TX</SelectItem>
                  <SelectItem value="Dallas">Dallas, TX</SelectItem>
                  <SelectItem value="Denver">Denver, CO</SelectItem>
                </SelectContent>
              </Select>

              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="Climber">Climber</SelectItem>
                  <SelectItem value="Crane Operator">Crane Operator</SelectItem>
                  <SelectItem value="PHC Technician">PHC Technician</SelectItem>
                  <SelectItem value="Storm Response">Storm Response</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="budget-high">Highest Budget</SelectItem>
                  <SelectItem value="budget-low">Lowest Budget</SelectItem>
                  <SelectItem value="urgent">Most Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </LovartCard>

          {/* Jobs List */}
          <div className="grid gap-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="heading-sm mb-2">No jobs found</h3>
                <p className="body-md text-lovart-neutral mb-4">
                  Try adjusting your search criteria or check back later for new opportunities.
                </p>
                <Button variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              filteredJobs.map((job, index) => (
                <JobCard key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="heading-sm hover:text-lovart-primary transition-colors duration-200 cursor-pointer">
                              {job.title}
                            </h3>
                            {job.verified && (
                              <Badge variant="success" className="text-xs">
                                ✓ Verified
                              </Badge>
                            )}
                            {job.urgency === 'urgent' && (
                              <StatusBadge status="urgent">
                                <AlertCircle className="h-3 w-3" />
                                Urgent
                              </StatusBadge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 mb-3">
                            <Link href={`/companies/${job.company.replace(/\s+/g, '-').toLowerCase()}`}>
                              <span className="body-md text-lovart-primary hover:underline cursor-pointer">
                                {job.company}
                              </span>
                            </Link>
                            <RatingDisplay rating={job.companyRating} showNumber={false} size="sm" />
                          </div>

                          <p className="body-md text-lovart-neutral mb-4 line-clamp-2">
                            {job.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-lovart-neutral mb-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Posted {job.postedDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Due {job.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{job.applicants} applicants</span>
                            </div>
                          </div>

                          <SkillList skills={job.skills} maxVisible={3} size="sm" />
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-48 flex flex-col justify-between">
                      <div className="text-right mb-4">
                        <PriceBadge className="mb-2 text-lg font-bold">
                          {job.budget}
                        </PriceBadge>
                        <div className="text-xs text-lovart-neutral">
                          {getBudgetRange(job.budget) === 'hourly' ? 'Hourly Rate' : 'Fixed Price'}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Link href={`/jobs/${job.id}`}>
                          <Button className="w-full">
                            View Details
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                        {session && (
                          <Button variant="outline" size="sm" className="w-full">
                            Save Job
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </JobCard>
              ))
            )}
          </div>

          {/* Load More */}
          {filteredJobs.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
