import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'services', href: '#services' },
    { key: 'testimonials', href: '#testimonials' },
    { key: 'contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-heading font-bold text-neon" data-testid="logo">
              &lt;E/&gt;
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="text-foreground hover:text-neon transition-colors text-sm font-body"
                data-testid={`link-${item.key}`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleLanguage}
              data-testid="button-language-toggle"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleLanguage}
              data-testid="button-language-toggle-mobile"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle-mobile"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border" data-testid="mobile-menu">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-neon hover:bg-accent/10 rounded-md transition-colors"
                data-testid={`link-mobile-${item.key}`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
