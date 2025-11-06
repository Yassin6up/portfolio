import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mobileApp1 from '@assets/generated_images/Mobile_e-commerce_app_mockup_535d252d.png';
import webDashboard from '@assets/generated_images/Web_dashboard_analytics_mockup_1497f5fa.png';
import mobileApp2 from '@assets/generated_images/Fitness_tracker_app_mockup_267daf6b.png';
import webRestaurant from '@assets/generated_images/Restaurant_ordering_website_mockup_8c3bab53.png';
import webRealEstate from '@assets/generated_images/Real_estate_web_app_mockup_836a5364.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'E-Commerce Mobile App',
    description: 'Full-featured shopping app with payment integration and real-time inventory',
    image: mobileApp1,
    category: 'mobile',
    tech: ['React Native', 'Node.js', 'MySQL'],
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time analytics platform with interactive data visualization',
    image: webDashboard,
    category: 'web',
    tech: ['React.js', 'Express.js', 'Charts.js'],
  },
  {
    title: 'Fitness Tracker App',
    description: 'Track workouts, nutrition, and progress with AI-powered insights',
    image: mobileApp2,
    category: 'mobile',
    tech: ['React Native', 'Expo', 'Firebase'],
  },
  {
    title: 'Restaurant Ordering System',
    description: 'Online food ordering platform with menu management and delivery tracking',
    image: webRestaurant,
    category: 'fullstack',
    tech: ['React.js', 'Node.js', 'MySQL'],
  },
  {
    title: 'Real Estate Platform',
    description: 'Property listing and search platform with advanced filters and maps',
    image: webRealEstate,
    category: 'web',
    tech: ['React.js', 'Express.js', 'PostgreSQL'],
  },
];

const categories = ['all', 'mobile', 'web', 'backend', 'fullstack'];

export default function PortfolioSection() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (inView && sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll('.project-card'), {
        opacity: 0,
        y: 80,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }
  }, [inView, activeCategory]);

  const setRefs = (node: HTMLElement | null) => {
    if (node) {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      inViewRef(node);
    }
  };

  return (
    <section
      ref={setRefs}
      id="portfolio"
      className="py-20 sm:py-32 bg-background"
      data-testid="section-portfolio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4" data-testid="text-portfolio-title">
            <span className="text-neon">{t('portfolio.title')}</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body" data-testid="text-portfolio-subtitle">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? 'bg-neon hover:bg-neon/90 text-primary-foreground' : 'border-neon text-neon hover:bg-neon/10'}
              data-testid={`button-filter-${category}`}
            >
              {t(`portfolio.${category}`)}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative bg-card rounded-lg overflow-hidden hover-elevate active-elevate-2 cursor-pointer"
              data-testid={`card-project-${index}`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  data-testid={`img-project-${index}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-2 text-foreground" data-testid={`text-project-title-${index}`}>
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 font-body" data-testid={`text-project-description-${index}`}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs" data-testid={`badge-tech-${index}-${techIndex}`}>
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <Button
                  size="sm"
                  className="bg-neon hover:bg-neon/90 text-primary-foreground gap-2"
                  data-testid={`button-view-project-${index}`}
                >
                  {t('portfolio.viewProject')}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
