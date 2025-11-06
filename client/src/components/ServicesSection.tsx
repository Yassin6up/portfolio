import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Smartphone, Globe, Server, Headphones } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = {
  mobile: Smartphone,
  web: Globe,
  backend: Server,
  consulting: Headphones,
};

export default function ServicesSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView && sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll('.service-card'), {
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }
  }, [inView]);

  const services = [
    {
      key: 'mobile',
      icon: serviceIcons.mobile,
    },
    {
      key: 'web',
      icon: serviceIcons.web,
    },
    {
      key: 'backend',
      icon: serviceIcons.backend,
    },
    {
      key: 'consulting',
      icon: serviceIcons.consulting,
    },
  ];

  const setRefs = (node: HTMLElement | null) => {
    if (node) {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      inViewRef(node);
    }
  };

  return (
    <section
      ref={setRefs}
      id="services"
      className="py-20 sm:py-32 bg-card"
      data-testid="section-services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4" data-testid="text-services-title">
            <span className="text-neon">{t('services.title')}</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body" data-testid="text-services-subtitle">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card group p-8 bg-background rounded-lg hover-elevate active-elevate-2 cursor-pointer transition-all duration-300"
                data-testid={`card-service-${service.key}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-neon/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-12 w-12 text-neon" />
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold mb-4 text-foreground" data-testid={`text-service-title-${service.key}`}>
                    {t(`services.${service.key}.title`)}
                  </h3>
                  
                  <ul className="space-y-2 text-muted-foreground font-body">
                    {(t(`services.${service.key}.items`, { returnObjects: true }) as string[]).map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center justify-center gap-2" data-testid={`text-service-item-${service.key}-${itemIndex}`}>
                        <span className="w-1.5 h-1.5 bg-neon rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
