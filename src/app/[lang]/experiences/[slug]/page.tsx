import { SliceZone } from '@prismicio/react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

type Params = { uid: string; slug: string };

export default async function Page({ params }: { params: Params }) {
  console.log('params', params);

  const client = createClient();
  const page = await client
    .getByUID('experience', params.slug)
    .catch(() => notFound());

  console.log('page', page);

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID('experience', params.slug)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType('experience');

  return pages.map((page) => {
    return { slug: page.uid };
  });
}
