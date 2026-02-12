import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { staggerChildVariants } from '@/components/ui/ScrollReveal';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  showCategory?: boolean;
  index?: number;
}

/**
 * Project card with 3D tilt hover effect and smooth reveal
 */
export function ProjectCard({ 
  project, 
  aspectRatio, 
  showCategory = true,
  index = 0 
}: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const ratio = aspectRatio || 'landscape';
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  const aspectRatioClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[3/2]',
    square: 'aspect-square'
  };

  const cardContent = (
    <>
      <div className={cn('relative overflow-hidden bg-muted', aspectRatioClasses[ratio])}>
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        
        <motion.img
          src={project.coverImage}
          alt={project.title}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-all duration-700',
            isLoaded ? 'opacity-100' : 'opacity-0',
            'group-hover:scale-110'
          )}
          loading={index < 6 ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Overlay with gradient and text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
            <motion.h3
              className="text-white text-xl md:text-2xl font-light tracking-wide flex items-center gap-2"
              initial={false}
            >
              {project.title}
              {project.externalUrl && <ExternalLink className="size-4 text-white/70" />}
            </motion.h3>
            {showCategory && (
              <div className="flex items-center gap-3 text-sm text-white/80 font-light tracking-wide">
                <span className="capitalize">{project.category}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>
            )}
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
      </div>
    </>
  );

  const linkClass = "group block relative overflow-hidden rounded-sm";

  return (
    <motion.div
      ref={cardRef}
      variants={staggerChildVariants}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="will-change-transform"
    >
      {project.externalUrl ? (
        <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {cardContent}
        </a>
      ) : (
        <Link to={`/project/${project.slug}`} className={linkClass}>
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}
