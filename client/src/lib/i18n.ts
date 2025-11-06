import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        portfolio: 'Portfolio',
        services: 'Services',
        testimonials: 'Testimonials',
        contact: 'Contact'
      },
      hero: {
        greeting: "Hi, I'm Elhardouf",
        title: 'I Build Apps & Websites',
        subtitle: 'Freelance Developer | React Native, React.js, Express.js | Turning Ideas Into Digital Reality',
        cta1: 'View My Work',
        cta2: 'Contact Me'
      },
      about: {
        title: 'About Me',
        description: "I'm a passionate freelance developer with expertise in building modern, scalable applications. I specialize in React Native for mobile apps, React.js for web applications, and Express.js for robust backend solutions. With years of experience turning ideas into reality, I'm committed to delivering exceptional digital experiences that exceed expectations.",
        techStack: 'Tech Stack'
      },
      skills: {
        title: 'My Skills',
        subtitle: 'Technologies I work with',
        years: 'years',
        projects: 'projects'
      },
      portfolio: {
        title: 'Featured Projects',
        subtitle: 'Some of my recent work',
        all: 'All',
        mobile: 'Mobile Apps',
        web: 'Websites',
        backend: 'Backend',
        fullstack: 'Full Stack',
        viewProject: 'View Project',
        liveDemo: 'Live Demo'
      },
      services: {
        title: 'Services',
        subtitle: 'What I offer',
        mobile: {
          title: 'Mobile Apps Development',
          items: ['React Native Apps', 'Expo Development', 'Cross-platform Solutions', 'App Store Deployment']
        },
        web: {
          title: 'Web Development',
          items: ['React.js Applications', 'Responsive Design', 'Progressive Web Apps', 'UI/UX Implementation']
        },
        backend: {
          title: 'Backend & API',
          items: ['Node.js & Express.js', 'RESTful APIs', 'Database Design (MySQL)', 'Third-party Integrations']
        },
        consulting: {
          title: 'Consulting & Support',
          items: ['Technical Consulting', 'Code Review', 'Maintenance & Updates', 'Performance Optimization']
        }
      },
      testimonials: {
        title: 'What Clients Say',
        subtitle: 'Testimonials from happy clients'
      },
      contact: {
        title: 'Get In Touch',
        subtitle: "Let's work together",
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        send: 'Send Message',
        info: 'Contact Information',
        emailLabel: 'Email',
        emailValue: 'hi@elhrdouf.com'
      },
      footer: {
        tagline: 'Building digital experiences that matter',
        quickLinks: 'Quick Links',
        social: 'Social Media',
        copyright: '© 2025 Elhardouf.com',
        signature: 'Designed & Developed by Me'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        about: 'عن',
        skills: 'المهارات',
        portfolio: 'الأعمال',
        services: 'الخدمات',
        testimonials: 'التوصيات',
        contact: 'اتصل'
      },
      hero: {
        greeting: 'مرحباً، أنا الحردوف',
        title: 'أبني التطبيقات والمواقع',
        subtitle: 'مطور مستقل | React Native, React.js, Express.js | تحويل الأفكار إلى واقع رقمي',
        cta1: 'عرض أعمالي',
        cta2: 'تواصل معي'
      },
      about: {
        title: 'عني',
        description: 'أنا مطور مستقل شغوف بخبرة في بناء تطبيقات حديثة وقابلة للتطوير. أتخصص في React Native لتطبيقات الجوال، React.js لتطبيقات الويب، و Express.js للحلول الخلفية القوية. مع سنوات من الخبرة في تحويل الأفكار إلى واقع، أنا ملتزم بتقديم تجارب رقمية استثنائية تتجاوز التوقعات.',
        techStack: 'المهارات التقنية'
      },
      skills: {
        title: 'مهاراتي',
        subtitle: 'التقنيات التي أعمل بها',
        years: 'سنوات',
        projects: 'مشاريع'
      },
      portfolio: {
        title: 'المشاريع المميزة',
        subtitle: 'بعض من أعمالي الأخيرة',
        all: 'الكل',
        mobile: 'تطبيقات الجوال',
        web: 'المواقع',
        backend: 'الخلفية',
        fullstack: 'Full Stack',
        viewProject: 'عرض المشروع',
        liveDemo: 'معاينة مباشرة'
      },
      services: {
        title: 'الخدمات',
        subtitle: 'ما أقدمه',
        mobile: {
          title: 'تطوير تطبيقات الجوال',
          items: ['تطبيقات React Native', 'تطوير Expo', 'حلول متعددة المنصات', 'نشر في متجر التطبيقات']
        },
        web: {
          title: 'تطوير الويب',
          items: ['تطبيقات React.js', 'تصميم متجاوب', 'تطبيقات ويب تقدمية', 'تطبيق UI/UX']
        },
        backend: {
          title: 'الخلفية وAPI',
          items: ['Node.js و Express.js', 'واجهات RESTful', 'تصميم قواعد البيانات (MySQL)', 'التكامل مع طرف ثالث']
        },
        consulting: {
          title: 'الاستشارات والدعم',
          items: ['استشارات تقنية', 'مراجعة الكود', 'الصيانة والتحديثات', 'تحسين الأداء']
        }
      },
      testimonials: {
        title: 'آراء العملاء',
        subtitle: 'شهادات من عملاء سعداء'
      },
      contact: {
        title: 'تواصل معي',
        subtitle: 'دعنا نعمل معاً',
        name: 'اسمك',
        email: 'بريدك الإلكتروني',
        message: 'رسالتك',
        send: 'إرسال الرسالة',
        info: 'معلومات الاتصال',
        emailLabel: 'البريد الإلكتروني',
        emailValue: 'hi@elhrdouf.com'
      },
      footer: {
        tagline: 'بناء تجارب رقمية مهمة',
        quickLinks: 'روابط سريعة',
        social: 'وسائل التواصل',
        copyright: '© 2025 Elhardouf.com',
        signature: 'صممت وطورت بواسطتي'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
