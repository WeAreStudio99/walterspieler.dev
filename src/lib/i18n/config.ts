import { Config, Locale } from './types';

const I18N_LOCALES: Locale[] = ['en-gb', 'fr-fr'];

const I18N_CONFIG: Config = {
  defaultLocale: 'en-gb',
  locales: I18N_LOCALES,
};

export { I18N_CONFIG, I18N_LOCALES };
