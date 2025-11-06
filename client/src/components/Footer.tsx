import { useTranslation } from 'react-i18next';
import { SiLinkedin, SiGithub, SiWhatsapp } from 'react-icons/si';

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'services', href: '#services' },
    { key: 'contact', href: '#contact' },
  ];


  const socialLinks = [
    { icon: SiLinkedin, href: 'https://www.linkedin.com/in/yassin-ait-elhardouf-676974247/', label: 'LinkedIn', color: '#0A66C2' },
    { icon: SiGithub, href: 'https://github.com/Yassin6up', label: 'GitHub', color: '#181717' },
    { icon: SiWhatsapp, href: 'https://wa.link/t0haaz', label: 'WhatsApp', color: '#25D366' },
  ];

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-3xl font-heading font-bold text-neon mb-4" data-testid="text-footer-logo">
              &lt;E/&gt;
            </div>
            <p className="text-muted-foreground font-body" data-testid="text-footer-tagline">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-foreground" data-testid="text-footer-quick-links-title">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted-foreground hover:text-neon transition-colors font-body"
                    data-testid={`link-footer-${link.key}`}
                  >
                    {t(`nav.${link.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-foreground" data-testid="text-footer-social-title">
              {t('footer.social')}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-background rounded-lg hover-elevate active-elevate-2 transition-all"
                  data-testid={`link-footer-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5 text-muted-foreground hover:text-neon transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground font-body mb-2" data-testid="text-footer-copyright">
            {t('footer.copyright')}
          </p>
          <p className="text-sm text-muted-foreground font-body" data-testid="text-footer-signature">
            {t('footer.signature')}
          </p>
        </div>
      </div>
    </footer>
  );
}
