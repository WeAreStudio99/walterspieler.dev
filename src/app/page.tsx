import { Metadata } from 'next';

import { BaseLayout } from '@/components/BaseLayout';
import { Home } from '@/components/pages/Home';
import { I18N_CONFIG } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/utils';
import { createClient } from '@/prismicio';

export default async function HomePage() {
  const lang = I18N_CONFIG.defaultLocale;
  const dictionary = await getDictionary(lang);

  return (
    <BaseLayout lang={lang} dictionary={dictionary}>
      <Home lang={lang} />
    </BaseLayout>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('home');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
