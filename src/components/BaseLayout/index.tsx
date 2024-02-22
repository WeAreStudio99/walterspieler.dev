'use client';

import { FC, PropsWithChildren } from 'react';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { SpaceGrotesk } from '@/lib/fonts';
import { Dictionary, Locale } from '@lib/i18n/types';

type Props = PropsWithChildren<{
  lang: Locale;
  dictionary: Dictionary;
}>;

export const BaseLayout: FC<Props> = (props) => {
  const { children, lang, dictionary } = props;

  const pathName = usePathname();

  return (
    <html lang={lang}>
      <body
        className={clsx(
          SpaceGrotesk.variable,
          'bg-obsidian',
          'font-sans text-white'
        )}
      >
        <main className={clsx('w-full', 'flex flex-col gap-10 pb-10')}>
          {children}
        </main>
      </body>
    </html>
  );
};
