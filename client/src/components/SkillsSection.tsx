import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React Native', percentage: 95, years: 5, projects: 30 },
  { name: 'React.js', percentage: 92, years: 6, projects: 45 },
  { name: 'Node.js', percentage: 88, years: 5, projects: 40 },
  { name: 'Express.js', percentage: 90, years: 5, projects: 38 },
  { name: 'MySQL', percentage: 85, years: 4, projects: 25 },
  { name: 'TypeScript', percentage: 87, years: 4, projects: 35 },
  { name: 'REST APIs', percentage: 93, years: 5, projects: 50 },
  { name: 'UI/UX Design', percentage: 80, years: 4, projects: 40 },
];

export default function SkillsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>(skills.map(() => 0));

  useEffect(() => {
    if (inView && sectionRef.current) {
      skills.forEach((skill, index) => {
        gsap.to({}, {
          duration: 2,
          onUpdate: function() {
            const progress = this.progress();
            setAnimatedPercentages(prev => {
              const newPercentages = [...prev];
              newPercentages[index] = Math.round(skill.percentage * progress);
              return newPercentages;
            });
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      });
    }
  }, [inView]);

  const getStrokeDashoffset = (percentage: number) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    return circumference - (percentage / 100) * circumference;
  };

  const setRefs = (node: HTMLElement | null) => {
    if (node) {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      inViewRef(node);
    }
  };

  return (
    <section
      ref={setRefs}
      id="skills"
      className="py-20 sm:py-32 bg-card"
      data-testid="section-skills"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4" data-testid="text-skills-title">
            <span className="text-neon">{t('skills.title')}</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body" data-testid="text-skills-subtitle">
            {t('skills.subtitle')}
          </p>
        </div>

        <TooltipProvider>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="relative w-32 h-32 mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-muted/20"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          strokeDashoffset={getStrokeDashoffset(animatedPercentages[index])}
                          className="text-neon transition-all duration-1000 ease-out"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-foreground" data-testid={`text-skill-percentage-${index}`}>
                          {animatedPercentages[index]}%
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground text-center">
                      {skill.name}
                    </h3>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{skill.years} {t('skills.years')} • {skill.projects} {t('skills.projects')}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
