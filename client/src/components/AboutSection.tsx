import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiReact, SiNodedotjs, SiExpress, SiMysql, SiJavascript, SiTypescript, SiTailwindcss, SiGit } from 'react-icons/si';
import profileImage from '../../public/profile.png';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { icon: SiReact, name: 'React Native', color: '#61DAFB' },
  { icon: SiReact, name: 'React.js', color: '#61DAFB' },
  { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
  { icon: SiExpress, name: 'Express.js', color: '#000000' },
  { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
  { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
  { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
  { icon: SiGit, name: 'Git', color: '#F05032' },
];

export default function AboutSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView && sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      tl.from(sectionRef.current.querySelector('.about-image'), {
        opacity: 0,
        x: -100,
        rotateY: -30,
        duration: 1.2,
        ease: 'power3.out',
      })
      .from(sectionRef.current.querySelector('.about-content'), {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8')
      .from(sectionRef.current.querySelector('.about-title'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
      }, '-=0.6')
      .from(sectionRef.current.querySelector('.about-description'), {
        opacity: 0,
        y: 20,
        duration: 0.6,
      }, '-=0.4')
      .from(sectionRef.current.querySelectorAll('.tech-icon'), {
        opacity: 0,
        scale: 0,
        rotation: 180,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, '-=0.3');

      gsap.to(sectionRef.current.querySelectorAll('.tech-icon'), {
        y: -10,
        duration: 2,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
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
      id="about"
      className="py-20 sm:py-32 bg-background"
      data-testid="section-about"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="about-image">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-neon/20 rounded-2xl blur-3xl" />
              <img
                src={profileImage}
                alt="Elhardouf"
                className="relative rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-300"
                data-testid="img-profile"
              />
            </div>
          </div>

          <div className="about-content">
            <h2 className="about-title text-4xl sm:text-5xl font-heading font-bold mb-6" data-testid="text-about-title">
              <span className="text-neon">{t('about.title')}</span>
            </h2>
            <p className="about-description text-lg text-muted-foreground mb-8 leading-relaxed font-body" data-testid="text-about-description">
              {t('about.description')}
            </p>

            <h3 className="text-2xl font-heading font-semibold mb-6 text-foreground" data-testid="text-tech-stack-title">
              {t('about.techStack')}
            </h3>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="tech-icon flex flex-col items-center gap-2 p-4 rounded-lg bg-card hover-elevate active-elevate-2 cursor-pointer"
                  data-testid={`tech-icon-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <tech.icon className="h-8 w-8" style={{ color: tech.color }} />
                  <span className="text-xs text-center text-muted-foreground">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
