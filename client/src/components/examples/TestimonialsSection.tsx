import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import TestimonialsSection from '../TestimonialsSection';

export default function TestimonialsSectionExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <TestimonialsSection />
    </I18nextProvider>
  );
}
