
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input, SearchInput } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LovartCard, CompanyCard } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkillBadge, SkillList } from '@/components/skill-badge';
import { RatingDisplay } from '@/components/rating-display';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star,
  User,
  Users,
  Award,
  Shield,
  Clock,
  DollarSign,
  Phone,
  Mail,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

interface Professional {
  id: string;
  user: {
    name: string;
    email: string;
  };
  phone?: string;
  bio?: string;
  experience: number;
  hourlyRate?: number;
  rating: number;
  totalJobs: number;
  verified: boolean;
  insured: boolean;
  availability: string;
  locationCity?: string;
  locationState?: string;
  skills: Array<{
    skillType: string;
    name: string;
    level: string;
    verified: boolean;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    verified: boolean;
  }>;
}

export default function ProfessionalsPage() {
  const { data: session } = useSession();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const response = await fetch('/api/professionals');
      if (response.ok) {
        const data = await response.json();
        setProfessionals(data);
      }
    } catch (error) {
      console.error('Error fetching professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = professional.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const location = `${professional.locationCity}, ${professional.locationState}`;
    const matchesLocation = locationFilter === 'all' || location.includes(locationFilter);
    const matchesSkill = skillFilter === 'all' || professional.skills.some(skill => skill.skillType === skillFilter);
    const matchesAvailability = availabilityFilter === 'all' || professional.availability === availabilityFilter;
    
    return matchesSearch && matchesLocation && matchesSkill && matchesAvailability;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'AVAILABLE': return 'bg-green-500 text-white';
      case 'BUSY': return 'bg-orange-500 text-white';
      case 'STORM_ONLY': return 'bg-red-500 text-white';
      case 'SEASONAL': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container-enhanced section-spacing">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="loading-skeleton-enhanced h-80 rounded-xl" />
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
                Tree Care <span className="text-lovart-primary">Professionals</span>
              </h1>
              <p className="body-md text-lovart-neutral">
                Connect with certified arborists and tree care experts
              </p>
            </div>
            
            {session && (
              <div className="flex items-center gap-3 animate-slide-in-right">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Saved Profiles
                </Button>
                <Link href="/profile/create">
                  <Button>
                    Join as Professional
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <LovartCard className="p-4 text-center animate-fade-in-up">
              <div className="w-10 h-10 rounded-xl bg-lovart-primary/10 flex items-center justify-center mx-auto mb-2">
                <Users className="h-5 w-5 text-lovart-primary" />
              </div>
              <div className="text-xl font-bold text-lovart-forest">{professionals.length}</div>
              <div className="text-xs text-lovart-neutral">Active Professionals</div>
            </LovartCard>

            <LovartCard className="p-4 text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-10 h-10 rounded-xl bg-lovart-orange/10 flex items-center justify-center mx-auto mb-2">
                <Star className="h-5 w-5 text-lovart-orange" />
              </div>
              <div className="text-xl font-bold text-lovart-forest">4.8</div>
              <div className="text-xs text-lovart-neutral">Avg Rating</div>
            </LovartCard>

            <LovartCard className="p-4 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                <Shield className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="text-xl font-bold text-lovart-forest">89%</div>
              <div className="text-xs text-lovart-neutral">Verified & Insured</div>
            </LovartCard>

            <LovartCard className="p-4 text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
              <div className="text-xl font-bold text-lovart-forest">$75</div>
              <div className="text-xs text-lovart-neutral">Avg Hourly Rate</div>
            </LovartCard>
          </div>

          {/* Search and Filters */}
          <LovartCard className="p-6 mb-8 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="search-bar-enhanced">
                  <Search className="h-5 w-5 text-lovart-neutral" />
                  <SearchInput
                    placeholder="Search professionals, skills, or locations..."
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
                  <SelectItem value="CLIMBER">Climber</SelectItem>
                  <SelectItem value="CRANE_OPERATOR">Crane Operator</SelectItem>
                  <SelectItem value="PHC_TECH">PHC Technician</SelectItem>
                  <SelectItem value="STORM_RESPONSE">Storm Response</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                  <SelectItem value="jobs">Most Jobs</SelectItem>
                  <SelectItem value="rate-low">Lowest Rate</SelectItem>
                  <SelectItem value="rate-high">Highest Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </LovartCard>

          {/* Professionals Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="heading-sm mb-2">No professionals found</h3>
                <p className="body-md text-lovart-neutral mb-4">
                  Try adjusting your search criteria or check back later.
                </p>
                <Button variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              filteredProfessionals.map((professional, index) => (
                <CompanyCard key={professional.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-lovart-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {professional.user.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="heading-sm truncate">{professional.user.name}</h3>
                        {professional.verified && (
                          <Badge variant="success" className="text-xs flex-shrink-0">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <RatingDisplay rating={professional.rating} reviewCount={professional.totalJobs} size="sm" />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-lovart-neutral">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{professional.locationCity}, {professional.locationState}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{professional.experience}+ years</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {professional.bio && (
                    <p className="body-sm text-lovart-neutral mb-4 line-clamp-2">
                      {professional.bio}
                    </p>
                  )}

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {professional.skills.slice(0, 3).map((skill, skillIndex) => (
                        <SkillBadge key={skillIndex} skill={formatSkillType(skill.skillType)} size="sm" />
                      ))}
                      {professional.skills.length > 3 && (
                        <div className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
                          +{professional.skills.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {professional.insured && (
                        <Badge variant="outline" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Insured
                        </Badge>
                      )}
                      <Badge className={getAvailabilityColor(professional.availability) + ' text-xs'}>
                        {professional.availability.replace('_', ' ')}
                      </Badge>
                    </div>
                    {professional.hourlyRate && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-lovart-primary">
                          ${professional.hourlyRate}
                        </div>
                        <div className="text-xs text-lovart-neutral">per hour</div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/professionals/${professional.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                    {session && (
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CompanyCard>
              ))
            )}
          </div>

          {/* Load More */}
          {filteredProfessionals.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Professionals
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
