import { FC, PropsWithChildren } from 'react';

import { BaseLayout } from '@components/BaseLayout';

import { Locale } from '@lib/i18n/types';
import { getDictionary } from '@lib/i18n/utils';

type Params = {
  lang: Locale;
};

type Props = PropsWithChildren<{
  params: Params;
}>;

const LangLayout: FC<Props> = async (props) => {
  const { children, params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);

  return (
    <BaseLayout dictionary={dictionary} lang={lang}>
      {children}
    </BaseLayout>
  );
};

export default LangLayout;
