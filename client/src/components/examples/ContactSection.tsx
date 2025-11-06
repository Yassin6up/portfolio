import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import ContactSection from '../ContactSection';

export default function ContactSectionExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <ContactSection />
    </I18nextProvider>
  );
}
