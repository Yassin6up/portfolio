import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export default function HeroSection() {
  const { t } = useTranslation();
  const typingRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typingRef.current) {
      const words = ['React Native', 'React.js', 'Express.js', 'Node.js', 'MySQL'];
      const tl = gsap.timeline({ repeat: -1 });
      
      words.forEach((word) => {
        tl.to(typingRef.current, {
          duration: 1,
          text: word,
          ease: 'none',
        })
        .to({}, { duration: 2 })
        .to(typingRef.current, {
          duration: 0.5,
          text: '',
          ease: 'none',
        });
      });
    }

    if (heroRef.current) {
      gsap.from(heroRef.current.querySelectorAll('.hero-content > *'), {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
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
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-background pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center hero-content">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6" data-testid="text-hero-greeting">
          <span className="text-foreground">{t('hero.greeting')}</span>
          <br />
          <span className="text-neon">{t('hero.title')}</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-muted-foreground mb-4 font-body" data-testid="text-hero-subtitle">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex items-center justify-center gap-2 mb-12 text-2xl font-mono text-neon">
          <span className="opacity-50">{'<'}</span>
          <span ref={typingRef} className="min-w-[200px] text-center" data-testid="text-typing-animation">React Native</span>
          <span className="opacity-50">{'/>'}</span>
          <span className="animate-pulse">|</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            onClick={scrollToWork}
            className="bg-neon hover:bg-neon/90 text-primary-foreground gap-2"
            data-testid="button-view-work"
          >
            {t('hero.cta1')}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToContact}
            className="border-neon text-neon hover:bg-neon/10"
            data-testid="button-contact"
          >
            {t('hero.cta2')}
          </Button>
        </div>
        
        <button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="animate-bounce inline-block text-muted-foreground hover:text-neon transition-colors"
          data-testid="button-scroll-down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}
