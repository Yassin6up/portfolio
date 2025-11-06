import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Send } from 'lucide-react';
import { SiLinkedin, SiGithub, SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await fetch('https://formspree.io/f/xovpgrjb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: `New message from ${formData.name}`
      }),
    });

    if (response.ok) {
      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. I will get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
    } else {
      throw new Error('Failed to send message');
    }
    
  } catch (error) {
    console.error('Error sending email:', error);
    toast({
      title: 'Error',
      description: 'Failed to send message. Please try again.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    { icon: SiLinkedin, href: 'https://www.linkedin.com/in/yassin-ait-elhardouf-676974247/', label: 'LinkedIn', color: '#0A66C2' },
    { icon: SiGithub, href: 'https://github.com/Yassin6up', label: 'GitHub', color: '#181717' },
    { icon: SiWhatsapp, href: 'https://wa.link/t0haaz', label: 'WhatsApp', color: '#25D366' },
  ];

  return (
    <section
      id="contact"
      className="py-20 sm:py-32 bg-card"
      data-testid="section-contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4" data-testid="text-contact-title">
            <span className="text-neon">{t('contact.title')}</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body" data-testid="text-contact-subtitle">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder={t('contact.name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background"
                  data-testid="input-contact-name"
                />
              </div>
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder={t('contact.email')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background"
                  data-testid="input-contact-email"
                />
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder={t('contact.message')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-background resize-none"
                  data-testid="input-contact-message"
                />
              </div>
              
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-neon hover:bg-neon/90 text-primary-foreground gap-2"
                data-testid="button-contact-submit"
              >
                {isSubmitting ? 'Sending...' : t('contact.send')}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-6 text-foreground" data-testid="text-contact-info-title">
                {t('contact.info')}
              </h3>
              
              <div className="flex items-center gap-4 mb-6 p-4 bg-background rounded-lg">
                <div className="p-3 bg-neon/10 rounded-full">
                  <Mail className="h-6 w-6 text-neon" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body">{t('contact.emailLabel')}</p>
                  <a
                    href="mailto:hi@elhrdouf.com"
                    className="text-lg font-heading font-semibold text-neon hover:underline"
                    data-testid="link-email"
                  >
                    {t('contact.emailValue')}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-heading font-bold mb-6 text-foreground" data-testid="text-social-title">
                {t('footer.social')}
              </h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-background rounded-lg hover-elevate active-elevate-2 transition-all"
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="h-6 w-6" style={{ color: social.color }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
