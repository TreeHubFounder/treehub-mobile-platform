
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  TreePine, 
  User, 
  Settings, 
  LogOut,
  Bell,
  Search
} from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container-enhanced">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-primary-enhanced text-white shadow-lovart transition-all duration-300 group-hover:shadow-lovart-lg group-hover:scale-105">
              <TreePine className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-lovart-forest">TreeHub</h1>
              <p className="text-xs text-lovart-neutral -mt-1">Professional Network</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href="/jobs" 
              className="text-lovart-neutral hover:text-lovart-primary font-medium transition-colors duration-300 hover:underline underline-offset-4"
            >
              Jobs
            </Link>
            <Link 
              href="/professionals" 
              className="text-lovart-neutral hover:text-lovart-primary font-medium transition-colors duration-300 hover:underline underline-offset-4"
            >
              Professionals
            </Link>
            <Link 
              href="/equipment" 
              className="text-lovart-neutral hover:text-lovart-primary font-medium transition-colors duration-300 hover:underline underline-offset-4"
            >
              Equipment
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                {/* Search button for mobile */}
                <Button variant="ghost" size="icon-sm" className="lg:hidden">
                  <Search className="h-5 w-5" />
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="icon-sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-lovart-orange rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">3</span>
                  </span>
                </Button>

                {/* Desktop user menu */}
                <div className="hidden md:flex items-center gap-3">
                  <Link href="/profile">
                    <Button variant="ghost" className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-lovart-primary text-white flex items-center justify-center font-semibold text-sm">
                        {session.user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span className="hidden lg:block font-medium text-lovart-forest">
                        {session.user?.name || 'User'}
                      </span>
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon-sm" onClick={handleSignOut}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={toggleMenu}
                  className="md:hidden"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/signin">
                  <Button variant="ghost" className="hidden sm:flex">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="default" size="sm">
                    Sign Up
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={toggleMenu}
                  className="sm:hidden"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="py-4 space-y-3">
              {/* Navigation links */}
              <div className="space-y-2">
                <Link 
                  href="/jobs"
                  className="block px-4 py-3 text-lovart-neutral hover:text-lovart-primary hover:bg-lovart-primary/5 rounded-lg transition-all duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Jobs
                </Link>
                <Link 
                  href="/professionals"
                  className="block px-4 py-3 text-lovart-neutral hover:text-lovart-primary hover:bg-lovart-primary/5 rounded-lg transition-all duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Professionals
                </Link>
                <Link 
                  href="/equipment"
                  className="block px-4 py-3 text-lovart-neutral hover:text-lovart-primary hover:bg-lovart-primary/5 rounded-lg transition-all duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Equipment
                </Link>
              </div>

              {session && (
                <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                  <Link 
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-lovart-neutral hover:text-lovart-primary hover:bg-lovart-primary/5 rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  <Link 
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 text-lovart-neutral hover:text-lovart-primary hover:bg-lovart-primary/5 rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  <button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              )}

              {!session && (
                <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                  <Link 
                    href="/auth/signin"
                    className="block px-4 py-3 text-lovart-neutral hover:text-lovart-primary hover:bg-lovart-primary/5 rounded-lg transition-all duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/signup"
                    className="block px-4 py-3 text-white bg-lovart-primary hover:bg-lovart-primary-dark rounded-lg transition-all duration-300 font-medium text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
