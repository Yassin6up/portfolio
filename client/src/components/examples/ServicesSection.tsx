import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import ServicesSection from '../ServicesSection';

export default function ServicesSectionExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <ServicesSection />
    </I18nextProvider>
  );
}
