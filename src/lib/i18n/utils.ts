import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';

import { I18N_CONFIG } from './config';
import { DICTIONARIES } from './constants';
import { Locale } from './types';

export const getDictionary = (locale: Locale) => {
  if (!(locale in DICTIONARIES)) {
    return DICTIONARIES[I18N_CONFIG.defaultLocale]();
  }

  return DICTIONARIES[locale]();
};

export const getLocaleFromRequest = (
  request: NextRequest
): string | undefined => {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = I18N_CONFIG.locales;

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales as unknown as string[]
  );

  return match(languages, locales, I18N_CONFIG.defaultLocale);
};
