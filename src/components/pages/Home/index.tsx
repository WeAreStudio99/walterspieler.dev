import { Locale } from '@/lib/i18n/types';
import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';
import { FC } from 'react';

type Props = {
  lang: Locale;
};

export const Home: FC<Props> = async (props) => {
  const client = createClient();
  const page = await client.getSingle('home');

  return <SliceZone slices={page.data.slices} components={components} />;
};
