import { I18N_CONFIG } from "@/lib/i18n/config";

export async function getLocales() {
  const locales = I18N_CONFIG.locales;

  return locales.map((locale) => {
    return {
      lang: locale,
    };
  });
}
