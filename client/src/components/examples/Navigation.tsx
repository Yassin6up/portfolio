import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '../Navigation';

export default function NavigationExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </I18nextProvider>
  );
}
