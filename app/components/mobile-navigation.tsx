
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { 
  Home, 
  Briefcase, 
  Users, 
  Wrench, 
  MessageCircle,
  User,
  Plus
} from 'lucide-react';

export function MobileNavigation() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const navItems = [
    {
      name: 'Home',
      href: '/dashboard',
      icon: Home,
      active: pathname === '/dashboard',
    },
    {
      name: 'Jobs',
      href: '/jobs',
      icon: Briefcase,
      active: pathname === '/jobs' || pathname?.startsWith('/jobs/'),
    },
    {
      name: 'People',
      href: '/professionals',
      icon: Users,
      active: pathname === '/professionals',
    },
    {
      name: 'Equipment',
      href: '/equipment',
      icon: Wrench,
      active: pathname === '/equipment',
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      active: pathname === '/profile',
    },
  ];

  return (
    <div className="mobile-nav-enhanced">
      <nav className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                nav-item-enhanced
                ${item.active ? 'nav-item-active-enhanced' : ''}
              `}
            >
              <Icon className={`h-5 w-5 ${item.active ? 'scale-110' : ''} transition-transform duration-300`} />
              <span className={`text-xs font-medium mt-1 ${item.active ? 'font-semibold' : ''} transition-all duration-300`}>
                {item.name}
              </span>
              {item.active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-lovart-primary rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Floating Action Button */}
      <div className="absolute -top-8 right-4">
        <Link 
          href="/jobs/create"
          className="flex items-center justify-center w-14 h-14 bg-gradient-secondary-enhanced text-white rounded-full shadow-lovart-lg hover:shadow-lovart-xl hover:scale-105 transition-all duration-300 group"
        >
          <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}

// Enhanced version with notifications
export function EnhancedMobileNavigation() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const navItems = [
    {
      name: 'Home',
      href: '/dashboard',
      icon: Home,
      active: pathname === '/dashboard',
      notifications: 0,
    },
    {
      name: 'Jobs',
      href: '/jobs',
      icon: Briefcase,
      active: pathname === '/jobs' || pathname?.startsWith('/jobs/'),
      notifications: 3,
    },
    {
      name: 'Messages',
      href: '/messages',
      icon: MessageCircle,
      active: pathname === '/messages',
      notifications: 2,
    },
    {
      name: 'Equipment',
      href: '/equipment',
      icon: Wrench,
      active: pathname === '/equipment',
      notifications: 0,
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      active: pathname === '/profile',
      notifications: 0,
    },
  ];

  return (
    <div className="mobile-nav-enhanced">
      <nav className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                nav-item-enhanced relative
                ${item.active ? 'nav-item-active-enhanced' : ''}
              `}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${item.active ? 'scale-110' : ''} transition-transform duration-300`} />
                {item.notifications > 0 && (
                  <div className="absolute -top-2 -right-2 h-4 w-4 bg-lovart-orange text-white rounded-full flex items-center justify-center text-[10px] font-bold animate-pulse-lovart">
                    {item.notifications > 9 ? '9+' : item.notifications}
                  </div>
                )}
              </div>
              <span className={`text-xs font-medium mt-1 ${item.active ? 'font-semibold' : ''} transition-all duration-300`}>
                {item.name}
              </span>
              {item.active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-lovart-primary rounded-full animate-slide-in-right"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Enhanced Floating Action Button with tooltip */}
      <div className="absolute -top-8 right-4 group">
        <Link 
          href="/jobs/create"
          className="flex items-center justify-center w-14 h-14 bg-gradient-secondary-enhanced text-white rounded-full shadow-lovart-lg hover:shadow-lovart-xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
        >
          <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300 relative z-10" />
          <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
        </Link>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Post a Job
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
}
