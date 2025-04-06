
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = false, 
  className 
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      'mb-12', 
      centered && 'text-center',
      className
    )}>
      <h1 className="heading-md text-foreground mb-4 reveal">{title}</h1>
      {subtitle && (
        <p className="paragraph max-w-3xl mx-auto reveal animation-delay-300">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;
