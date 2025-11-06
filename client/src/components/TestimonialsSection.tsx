import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const testimonials = [
  {
    name: 'Ebraheem Ahmad',
    role: 'CEO, TechSolutions Inc.',
    text: 'Elhardouf delivered an outstanding e-commerce platform that transformed our online business. His attention to detail and technical expertise resulted in a 40% increase in our conversion rates. The project was completed ahead of schedule with excellent communication throughout.',
    rating: 5,
  },
  {
    name: 'مصطفى',
    role: 'CEO, نادي الموظف',
    text: 'الحردوف طور لنا تطبيق جوال متكامل تجاوز توقعاتنا. التطبيق سهل الاستخدام وسريع الاستجابة، وساعد في زيادة تفاعل عملائنا بنسبة 60%. ننصح به بشدة لأي مشروع تقني.',
    rating: 5,
  },
  {
    name: 'Layla Hassan',
    role: 'Founder, FashionHub',
    text: 'Working with Elhardouf was a game-changer for our digital presence. He created a beautiful, responsive website that perfectly captures our brand essence. Our online sales have tripled since launching the new platform.',
    rating: 5,
  },
  {
    name: 'خالد ',
    role: 'مدير، تطبيق اللياقة',
    text: 'مطور متميز يتمتع بمهارات تقنية رائعة وأخلاق عمل عالية. قام بتطوير تطبيق متعقب اللياقة الخاص بنا بدقة وإبداع. التواصل كان ممتازاً والتسليم قبل الموعد المحدد.',
    rating: 5,
  },
  {
    name: 'Sarah ',
    role: 'Product Manager, FinTech Startup',
    text: 'Elhardouf built our complex financial dashboard with precision and expertise. His clean code and scalable architecture have set us up for future growth. A true professional who understands both technical and business requirements.',
    rating: 5,
  },
  {
    name: 'أحمد السعدي',
    role: 'مالك، متجر إلكتروني',
    text: 'شكراً للحردوف على المساعدة في تحويل متجري التقليدي إلى منصة رقمية متكاملة. زادت مبيعاتنا بنسبة 150% في أول شهرين من التشغيل. التصميم احترافي وسهل الاستخدام من قبل العملاء.',
    rating: 5,
  },
  {
    name: 'Michael',
    role: 'CTO, HealthTech Company',
    text: 'The backend infrastructure Elhardouf built for our healthcare app is robust, secure, and scalable. His expertise in Node.js and database optimization ensured we could handle millions of users seamlessly.',
    rating: 5,
  },
  {
    name: 'فاطمة',
    role: 'مديرة مشروع، منصة عقارية',
    text: 'الحردوف طور منصة العقارات الخاصة بنا بمهارة واحترافية. المنصة سهلت عملية البحث عن العقارات وزادت من كفاءة فريق المبيعات. نعتبره شريكاً تقنياً موثوقاً به.',
    rating: 5,
  },
  {
    name: 'David',
    role: 'Startup Founder, EduTech',
    text: 'Elhardouf took our educational app from concept to reality with incredible speed and quality. His React Native skills created a smooth, native-like experience on both iOS and Android platforms.',
    rating: 5,
  },
  {
    name: 'نورة الرشيد',
    role: 'مؤسسة، تطبيق طهي',
    text: 'تجربة رائعة في العمل مع الحردوف. قام بتطوير تطبيق الطهي الخاص بنا بتصميم أنيق ووظائف متقدمة. دعمه المستمر بعد التسليم كان مميزاً وجعل التجربة كاملة.',
    rating: 5,
  }
];

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (inView && sectionRef.current) {
      gsap.from(sectionRef.current.querySelector('.testimonial-card'), {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }
  }, [inView]);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  const setRefs = (node: HTMLElement | null) => {
    if (node) {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      inViewRef(node);
    }
  };

  return (
    <section
      ref={setRefs}
      id="testimonials"
      className="py-20 sm:py-32 bg-background"
      data-testid="section-testimonials"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4" data-testid="text-testimonials-title">
            <span className="text-neon">{t('testimonials.title')}</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body" data-testid="text-testimonials-subtitle">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="relative">
          <div className="testimonial-card bg-card p-8 sm:p-12 rounded-2xl" data-testid="card-testimonial">
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-neon text-neon" data-testid={`icon-star-${i}`} />
              ))}
            </div>

            <blockquote className="text-xl sm:text-2xl text-foreground mb-8 text-center font-body leading-relaxed" data-testid="text-testimonial-quote">
              "{currentTestimonial.text}"
            </blockquote>

            <div className="text-center">
              <p className="font-heading font-bold text-lg text-foreground mb-1" data-testid="text-testimonial-name">
                {currentTestimonial.name}
              </p>
              <p className="text-muted-foreground font-body" data-testid="text-testimonial-role">
                {currentTestimonial.role}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              size="icon"
              variant="outline"
              onClick={prevTestimonial}
              className="border-neon text-neon hover:bg-neon/10"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-neon w-8' : 'bg-muted'
                  }`}
                  data-testid={`button-testimonial-dot-${index}`}
                />
              ))}
            </div>

            <Button
              size="icon"
              variant="outline"
              onClick={nextTestimonial}
              className="border-neon text-neon hover:bg-neon/10"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
