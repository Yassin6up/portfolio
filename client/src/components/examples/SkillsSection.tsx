import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import SkillsSection from '../SkillsSection';

export default function SkillsSectionExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <SkillsSection />
    </I18nextProvider>
  );
}
