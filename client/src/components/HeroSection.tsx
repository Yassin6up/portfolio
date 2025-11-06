import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown, Sparkles, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export default function HeroSection() {
  const { t } = useTranslation();
  const typingRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typingRef.current) {
      const words = ['React Native', 'React.js', 'Express.js', 'Node.js', 'MySQL', 'TypeScript'];
      const tl = gsap.timeline({ repeat: -1 });
      
      words.forEach((word) => {
        tl.to(typingRef.current, {
          duration: 1.5,
          text: word,
          ease: 'power2.inOut',
        })
        .to({}, { duration: 2 })
        .to(typingRef.current, {
          duration: 0.8,
          text: '',
          ease: 'power2.in',
        });
      });
    }

    if (heroRef.current) {
      const tl = gsap.timeline();
      
      tl.from(heroRef.current.querySelector('.hero-badge'), {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      })
      .from(heroRef.current.querySelector('h1'), {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.3')
      .from(heroRef.current.querySelector('.hero-subtitle'), {
        opacity: 0,
        y: 50,
        duration: 0.8,
      }, '-=0.5')
      .from(heroRef.current.querySelector('.typing-container'), {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
      }, '-=0.4')
      .from(heroRef.current.querySelectorAll('.hero-button'), {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
      }, '-=0.3');

      gsap.to(heroRef.current.querySelector('.floating-icon-1'), {
        y: -20,
        x: 15,
        rotation: 360,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(heroRef.current.querySelector('.floating-icon-2'), {
        y: 15,
        x: -20,
        rotation: -360,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll('.floating-particle');
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: 'random(-150, 150)',
          x: 'random(-150, 150)',
          duration: 'random(4, 8)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.3,
        });
      });
    }
  }, []);

  const scrollToWork = () => {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background/50 to-background pointer-events-none" />
      
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-neon/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="floating-icon-1 absolute top-1/4 left-10 sm:left-20 opacity-10">
        <Code2 className="w-16 h-16 sm:w-24 sm:h-24 text-neon" />
      </div>
      
      <div className="floating-icon-2 absolute bottom-1/4 right-10 sm:right-20 opacity-10">
        <Sparkles className="w-20 h-20 sm:w-28 sm:h-28 text-primary" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="hero-badge inline-flex items-center gap-2 px-6 py-3 bg-neon/10 backdrop-blur-sm border border-neon/20 rounded-full mb-8">
          <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
          <span className="text-sm sm:text-base font-semibold text-neon font-body">
            {t('hero.badge') || 'Available for Freelance'}
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-8 leading-tight" data-testid="text-hero-greeting">
          <span className="block text-foreground mb-2">{t('hero.greeting')}</span>
          <span className="block bg-gradient-to-r from-neon via-primary to-neon bg-clip-text text-transparent animate-gradient">
            {t('hero.title')}
          </span>
        </h1>
        
        <p className="hero-subtitle text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 font-body max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
          {t('hero.subtitle')}
        </p>
        
        <div className="typing-container flex items-center justify-center gap-3 mb-12 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl max-w-xl mx-auto">
          <span className="text-lg sm:text-xl text-muted-foreground font-mono">{'<'}</span>
          <span
            ref={typingRef}
            className="min-w-[150px] sm:min-w-[200px] text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-neon text-center"
            data-testid="text-typing-animation"
          >
            React Native
          </span>
          <span className="text-lg sm:text-xl text-muted-foreground font-mono">{'/>'}</span>
          <span className="text-neon text-2xl sm:text-3xl animate-pulse font-mono">|</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          <Button
            size="lg"
            onClick={scrollToWork}
            className=" bg-neon hover:bg-neon/90 text-primary-foreground gap-2 text-base sm:text-lg px-8 py-6 rounded-xl shadow-lg shadow-neon/30 hover:shadow-neon/50 transition-all duration-300"
            data-testid="button-view-work"
          >
            {t('hero.cta1')} 
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToContact}
            className=" border-2 border-neon text-neon hover:bg-neon/10 text-base sm:text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
            data-testid="button-contact"
          >
            {t('hero.cta2')}
          </Button>
        </div>
        
        <button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-neon transition-colors group"
          data-testid="button-scroll-down"
        >
          <span className="text-sm font-body">{t('hero.scrollDown') || 'Scroll Down'}</span>
          <ChevronDown className="h-8 w-8 animate-bounce group-hover:animate-pulse" />
        </button>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient {
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </section>
  );
}
