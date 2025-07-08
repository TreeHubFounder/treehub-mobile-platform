
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LovartCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SkillBadge } from '@/components/skill-badge'
import { RatingDisplay } from '@/components/rating-display'
import { 
  TreePine, 
  Users, 
  Shield, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Zap,
  Award,
  TrendingUp,
  Clock,
  MapPin,
  Briefcase
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="section-spacing relative overflow-hidden">
        <div className="container-enhanced">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-6">
                <Badge variant="outline" className="border-lovart-primary text-lovart-primary bg-lovart-primary/5">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  #1 Tree Care Platform
                </Badge>
              </div>
              
              <h1 className="heading-hero mb-6">
                Connect with <span className="text-lovart-primary">Professional</span> Tree Care <span className="text-lovart-orange">Experts</span>
              </h1>
              
              <p className="body-xl mb-8 max-w-lg">
                The premier platform connecting certified arborists, tree care professionals, and property owners. Find experts, equipment, and opportunities in the tree care industry.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/auth/signup">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Get Started Free
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Browse Jobs
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-lovart-neutral">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-lovart-primary" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-lovart-primary" />
                  <span>Verified professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-lovart-primary" />
                  <span>Instant connections</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lovart-xl">
                <Image
                  src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/6e395e7a-c613-4300-835f-c3434593b20f.__CR0,0,970,600_PT0_SX970_V1___.jpg"
                  alt="Professional arborist working on tree care"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating stats cards */}
              <div className="absolute -bottom-6 -left-6 hidden lg:block">
                <LovartCard className="p-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-lovart-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-lovart-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl text-lovart-forest">5,000+</p>
                      <p className="text-sm text-lovart-neutral">Professionals</p>
                    </div>
                  </div>
                </LovartCard>
              </div>
              
              <div className="absolute -top-6 -right-6 hidden lg:block">
                <LovartCard className="p-4 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-lovart-orange/10 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-lovart-orange" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl text-lovart-forest">1,200+</p>
                      <p className="text-sm text-lovart-neutral">Active Jobs</p>
                    </div>
                  </div>
                </LovartCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-white">
        <div className="container-enhanced">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Why TreeHub?</h2>
            <p className="body-lg max-w-2xl mx-auto">
              The complete platform for tree care professionals and property owners to connect, collaborate, and grow their business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LovartCard className="text-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-2xl bg-lovart-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-lovart-primary" />
              </div>
              <h3 className="heading-sm mb-4">Verified Professionals</h3>
              <p className="body-md">
                All professionals are verified with certifications, insurance, and background checks for your peace of mind.
              </p>
            </LovartCard>
            
            <LovartCard className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 rounded-2xl bg-lovart-orange/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-lovart-orange" />
              </div>
              <h3 className="heading-sm mb-4">Instant Matching</h3>
              <p className="body-md">
                Our smart algorithm matches you with the right professionals based on skills, location, and availability.
              </p>
            </LovartCard>
            
            <LovartCard className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="heading-sm mb-4">Quality Guaranteed</h3>
              <p className="body-md">
                Rate and review system ensures high-quality work and helps you make informed decisions.
              </p>
            </LovartCard>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="section-spacing bg-lovart-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lovart-primary to-lovart-primary-dark" />
        <div className="container-enhanced relative">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4 text-white">Platform Activity</h2>
            <p className="body-lg text-white/90 max-w-2xl mx-auto">
              Join thousands of professionals already growing their business on TreeHub
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">5,247</div>
              <div className="text-white/80">Active Professionals</div>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">1,892</div>
              <div className="text-white/80">Jobs Posted</div>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-white/80">On-Time Completion</div>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="section-spacing bg-gray-50">
        <div className="container-enhanced">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="heading-lg mb-4">Featured Professionals</h2>
              <p className="body-lg">Meet some of our top-rated tree care experts</p>
            </div>
            <Link href="/professionals">
              <Button variant="outline">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Mike Johnson", company: "Elite Tree Services", rating: 4.9, reviews: 127, skills: ["Climber", "Crane Operator"], location: "Austin, TX" },
              { name: "Sarah Davis", company: "Green Canopy Care", rating: 5.0, reviews: 89, skills: ["PHC Technician", "Certified Arborist"], location: "Denver, CO" },
              { name: "Tom Rodriguez", company: "Storm Response Pro", rating: 4.8, reviews: 156, skills: ["Storm Response", "Ground Crew"], location: "Miami, FL" },
            ].map((pro, index) => (
              <LovartCard key={index} className="p-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-lovart-primary text-white flex items-center justify-center font-semibold">
                    {pro.name[0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lovart-forest">{pro.name}</h3>
                    <p className="text-sm text-lovart-neutral mb-2">{pro.company}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <RatingDisplay rating={pro.rating} reviewCount={pro.reviews} size="sm" />
                    </div>
                    <div className="flex items-center gap-1 mb-3 text-xs text-lovart-neutral">
                      <MapPin className="h-3 w-3" />
                      <span>{pro.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pro.skills.map((skill, skillIndex) => (
                        <SkillBadge key={skillIndex} skill={skill} size="sm" />
                      ))}
                    </div>
                  </div>
                </div>
              </LovartCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-secondary-enhanced text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lovart-orange to-lovart-orange-dark" />
        <div className="container-enhanced relative text-center">
          <h2 className="heading-lg mb-6 text-white">Ready to Grow Your Tree Care Business?</h2>
          <p className="body-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of professionals who trust TreeHub to connect with clients and grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="outline" className="bg-white text-lovart-orange border-white hover:bg-gray-50">
                Join as Professional
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" className="bg-white/20 border-white/20 text-white hover:bg-white/30">
                Find Tree Care Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
