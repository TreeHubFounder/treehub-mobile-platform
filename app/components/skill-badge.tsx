
'use client';

import { Badge } from "@/components/ui/badge";
import { 
  TreePine, 
  Truck, 
  Construction, 
  Leaf, 
  Zap,
  Star,
  Award,
  Shield
} from "lucide-react";

export interface SkillBadgeProps {
  skill: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const skillConfig = {
  'Climber': {
    icon: TreePine,
    variant: 'climber' as const,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  'Ground Crew': {
    icon: Truck,
    variant: 'groundwork' as const,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  'Groundwork': {
    icon: Truck,
    variant: 'groundwork' as const,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  'Crane Operator': {
    icon: Construction,
    variant: 'crane' as const,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  'PHC Technician': {
    icon: Leaf,
    variant: 'phc' as const,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  'Storm Response': {
    icon: Zap,
    variant: 'storm' as const,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  'Certified Arborist': {
    icon: Award,
    variant: 'climber' as const,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  'ISA Certified': {
    icon: Star,
    variant: 'phc' as const,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  'Safety Certified': {
    icon: Shield,
    variant: 'storm' as const,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
};

export function SkillBadge({ skill, size = 'md', className = '' }: SkillBadgeProps) {
  const config = skillConfig[skill as keyof typeof skillConfig] || skillConfig['Climber'];
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-xs gap-1.5',
    lg: 'px-4 py-2 text-sm gap-2',
  };
  
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div 
      className={`
        inline-flex items-center rounded-full font-semibold border transition-all duration-200 hover:shadow-sm
        ${config.color} ${config.bg} ${config.border}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <Icon className={iconSizes[size]} />
      <span>{skill}</span>
    </div>
  );
}

// Enhanced version with animation
export function AnimatedSkillBadge({ skill, size = 'md', className = '' }: SkillBadgeProps) {
  const config = skillConfig[skill as keyof typeof skillConfig] || skillConfig['Climber'];
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-xs gap-1.5',
    lg: 'px-4 py-2 text-sm gap-2',
  };
  
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div 
      className={`
        inline-flex items-center rounded-full font-semibold border transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer group
        ${config.color} ${config.bg} ${config.border}
        ${sizeClasses[size]}
        animate-fade-in-up
        ${className}
      `}
    >
      <Icon className={`${iconSizes[size]} group-hover:scale-110 transition-transform duration-300`} />
      <span className="group-hover:font-bold transition-all duration-300">{skill}</span>
    </div>
  );
}

// Compact skill list component
export function SkillList({ skills, maxVisible = 3, size = 'sm' }: { 
  skills: string[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const visibleSkills = skills.slice(0, maxVisible);
  const remainingCount = skills.length - maxVisible;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {visibleSkills.map((skill, index) => (
        <SkillBadge key={index} skill={skill} size={size} />
      ))}
      {remainingCount > 0 && (
        <div className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
          +{remainingCount} more
        </div>
      )}
    </div>
  );
}
