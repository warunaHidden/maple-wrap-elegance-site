
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "bg-white p-8 rounded-xl shadow-md feature-card reveal",
      className
    )}>
      <div className="text-maple-500 mb-5 transform transition-transform group-hover:scale-110">{icon}</div>
      <h3 className="heading-sm mb-3 group-hover:text-maple-600 transition-colors">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

export default FeatureCard;
