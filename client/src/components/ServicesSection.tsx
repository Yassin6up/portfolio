import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Smartphone, Globe, Server, Headphones, ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = {
  mobile: Smartphone,
  web: Globe,
  backend: Server,
  consulting: Headphones,
};

const serviceColors = {
  mobile: '#FF6B9D',
  web: '#00FF94',
  backend: '#0B9AFF',
  consulting: '#FFB800',
};

export default function ServicesSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (inView && sectionRef.current) {
      gsap.from(sectionRef.current.querySelector('.services-header'), {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          opacity: 0,
          y: 100,
          rotateX: -15,
          duration: 1,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });

        gsap.from(card.querySelector('.service-icon'), {
          scale: 0,
          rotation: -180,
          duration: 0.8,
          delay: index * 0.15 + 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });

        const items = card.querySelectorAll('.service-item');
        gsap.from(items, {
          opacity: 0,
          x: -30,
          stagger: 0.1,
          duration: 0.5,
          delay: index * 0.15 + 0.5,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });
      });

      const particles = sectionRef.current.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: 'random(-100, 100)',
          x: 'random(-100, 100)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });
    }
  }, [inView]);

  const services = [
    {
      key: 'mobile',
      icon: serviceIcons.mobile,
      color: serviceColors.mobile,
    },
    {
      key: 'web',
      icon: serviceIcons.web,
      color: serviceColors.web,
    },
    {
      key: 'backend',
      icon: serviceIcons.backend,
      color: serviceColors.backend,
    },
    {
      key: 'consulting',
      icon: serviceIcons.consulting,
      color: serviceColors.consulting,
    },
  ];

  const setRefs = (node: HTMLElement | null) => {
    if (node) {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      inViewRef(node);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={setRefs}
      id="services"
      className="relative py-20 sm:py-32 bg-card overflow-hidden"
      data-testid="section-services"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-neon/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-neon/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 services-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon/10 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-neon" />
            <span className="text-sm font-semibold text-neon font-body">
              {t('services.badge') || 'What I Offer'}
            </span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-heading font-bold mb-6" data-testid="text-services-title">
            <span className="bg-gradient-to-r from-neon via-primary to-neon bg-clip-text text-transparent">
              {t('services.title')}
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground font-body max-w-3xl mx-auto" data-testid="text-services-subtitle">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="service-card relative group"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => {
                  handleMouseLeave(index);
                  setHoveredService(null);
                }}
                data-testid={`card-service-${service.key}`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative h-full p-8 bg-background border-2 border-border rounded-2xl overflow-hidden transition-all duration-300">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${service.color}, transparent 70%)`,
                    }}
                  />

                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ backgroundColor: service.color }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div
                      className="service-icon mb-6 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                      style={{
                        backgroundColor: `${service.color}20`,
                        border: `2px solid ${service.color}40`,
                        boxShadow: hoveredService === index ? `0 10px 40px ${service.color}40` : 'none',
                      }}
                    >
                      <Icon
                        className="w-10 h-10"
                        style={{ color: service.color }}
                      />
                    </div>

                    <h3
                      className="text-2xl font-heading font-bold mb-6 text-center text-foreground"
                      data-testid={`text-service-title-${service.key}`}
                    >
                      {t(`services.${service.key}.title`)}
                    </h3>

                    <ul className="space-y-3 flex-1">
                      {(t(`services.${service.key}.items`, { returnObjects: true }) as string[]).map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="service-item flex items-start gap-3 text-muted-foreground font-body"
                          data-testid={`text-service-item-${service.key}-${itemIndex}`}
                        >
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: `${service.color}20` }}
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: service.color }}
                            />
                          </div>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className="mt-6 w-full py-3 rounded-xl font-semibold font-body transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      style={{
                        backgroundColor: hoveredService === index ? `${service.color}20` : 'transparent',
                        border: `2px solid ${service.color}40`,
                        color: service.color,
                      }}
                    >
                      <span>{t('services.learnMore') || 'Learn More'}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
