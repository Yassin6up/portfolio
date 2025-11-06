import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, Smartphone, Globe, Palette, Zap, Shield, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    category: 'Frontend',
    icon: Code2,
    color: '#00FF94',
    skills: [
      { name: 'React.js', level: 95, experience: '6 years' },
      { name: 'React Native', level: 92, experience: '5 years' },
      { name: 'TypeScript', level: 90, experience: '4 years' },
      { name: 'Next.js', level: 88, experience: '3 years' },
    ]
  },
  {
    category: 'Backend',
    icon: Database,
    color: '#0B9AFF',
    skills: [
      { name: 'Node.js', level: 93, experience: '5 years' },
      { name: 'Express.js', level: 90, experience: '5 years' },
      { name: 'MySQL', level: 87, experience: '4 years' },
      { name: 'MongoDB', level: 85, experience: '4 years' },
    ]
  },
  {
    category: 'Mobile',
    icon: Smartphone,
    color: '#FF6B9D',
    skills: [
      { name: 'iOS', level: 90, experience: '5 years' },
      { name: 'Android', level: 88, experience: '5 years' },
      { name: 'Expo', level: 92, experience: '4 years' },
      { name: 'Flutter', level: 75, experience: '2 years' },
    ]
  },
  {
    category: 'DevOps',
    icon: Cpu,
    color: '#FFB800',
    skills: [
      { name: 'Docker', level: 82, experience: '3 years' },
      { name: 'AWS', level: 78, experience: '3 years' },
      { name: 'CI/CD', level: 85, experience: '4 years' },
      { name: 'Git', level: 95, experience: '6 years' },
    ]
  },
];

export default function SkillsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    if (inView && sectionRef.current) {
      gsap.from(sectionRef.current.querySelector('.skills-title'), {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(sectionRef.current.querySelectorAll('.skill-category'), {
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      sectionRef.current.querySelectorAll('.skill-bar').forEach((bar) => {
        const level = bar.getAttribute('data-level');
        gsap.from(bar, {
          width: '0%',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
          },
        });
      });
    }
  }, [inView]);

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
      className="relative py-20 sm:py-32 bg-background overflow-hidden"
      data-testid="section-skills"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-neon rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 skills-title">
          <h2 className="text-5xl sm:text-6xl font-heading font-bold mb-6" data-testid="text-skills-title">
            <span className="bg-gradient-to-r from-neon to-primary bg-clip-text text-transparent">
              {t('skills.title')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto" data-testid="text-skills-subtitle">
            {t('skills.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div
                key={categoryIndex}
                className="skill-category relative group"
                data-testid={`skill-category-${category.category.toLowerCase()}`}
              >
                <div className="relative bg-card border border-border rounded-2xl p-8 hover-elevate active-elevate-2 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                    style={{ backgroundColor: category.color }}
                  />
                  
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-8">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${category.color}20`,
                          border: `2px solid ${category.color}40`
                        }}
                      >
                        <Icon
                          className="w-7 h-7"
                          style={{ color: category.color }}
                        />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-foreground">
                        {category.category}
                      </h3>
                    </div>

                    <div className="space-y-6">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="skill-item"
                          onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-base font-semibold text-foreground font-body">
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground font-body">
                                {skill.experience}
                              </span>
                              <span
                                className="text-lg font-bold font-heading"
                                style={{ color: category.color }}
                              >
                                {skill.level}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden rounded-full">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                            </div>
                            <div
                              className="skill-bar h-full rounded-full relative overflow-hidden transition-all duration-300"
                              data-level={skill.level}
                              style={{
                                width: `${skill.level}%`,
                                background: `linear-gradient(90deg, ${category.color}80, ${category.color})`,
                                boxShadow: hoveredSkill === `${categoryIndex}-${skillIndex}`
                                  ? `0 0 20px ${category.color}80`
                                  : 'none',
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Globe, label: t('skills.stat1') || '50+ Projects', value: '50+' },
            { icon: Zap, label: t('skills.stat2') || '6 Years Exp', value: '6Y' },
            { icon: Shield, label: t('skills.stat3') || '100% Quality', value: '100%' },
            { icon: Palette, label: t('skills.stat4') || '15+ Tech', value: '15+' },
          ].map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-card rounded-xl border border-border hover-elevate"
                data-testid={`skill-stat-${index}`}
              >
                <StatIcon className="w-8 h-8 mx-auto mb-3 text-neon" />
                <div className="text-3xl font-bold font-heading text-neon mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-body">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>
  );
}
