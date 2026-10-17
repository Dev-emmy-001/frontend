import { en } from './en';
import { fr } from './fr';
import { es } from './es';
import { ar } from './ar';
import { ja } from './ja';
import { pt } from './pt';

/**
 * Major Automotive Trading Languages metadata
 */
export const SUPPORTED_LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    flagSecondary: '🇬🇧',
    dir: 'ltr',
    region: 'North America / Global',
    popularIn: ['USA', 'UK', 'Canada', 'Nigeria', 'Kenya', 'Australia']
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    dir: 'ltr',
    region: 'Europe / Francophone Africa',
    popularIn: ['France', 'Belgium', 'Senegal', 'Ivory Coast', 'Cameroon']
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    flagSecondary: '🇲🇽',
    dir: 'ltr',
    region: 'Spain / Latin America',
    popularIn: ['Spain', 'Mexico', 'Colombia', 'Argentina', 'Chile']
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    flagSecondary: '🇦🇪',
    dir: 'rtl',
    region: 'Middle East & North Africa (MENA)',
    popularIn: ['UAE', 'Saudi Arabia', 'Qatar', 'Egypt', 'Kuwait', 'Oman']
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    dir: 'ltr',
    region: 'Japan (JDM Export)',
    popularIn: ['Japan', 'Asia-Pacific', 'JDM Importers Worldwide']
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    flagSecondary: '🇵🇹',
    dir: 'ltr',
    region: 'Brazil / Portugal / Lusophone Africa',
    popularIn: ['Brazil', 'Portugal', 'Angola', 'Mozambique']
  }
];

export const translations = {
  en,
  fr,
  es,
  ar,
  ja,
  pt
};

export default translations;
