import { Metadata } from 'next';

import { createClient } from '@/prismicio';

import { components } from '@/slices';
import { Locale } from '@lib/i18n/types';
import { SliceZone } from '@prismicio/react';
import { FC } from 'react';

type Params = {
  lang: Locale;
};

type Props = {
  params: Params;
};

const LangHomePage: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const client = createClient();
  const page = await client.getSingle('home', { lang });
  const menu = await client.getSingle('mainMenu', { lang: 'fr-fr' });

  console.log(menu.data.links);

  return <SliceZone slices={page.data.slices} components={components} />;
};

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('home');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export default LangHomePage;
