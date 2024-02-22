import './globals.css';

import { Viewport } from 'next';

import { FC, PropsWithChildren } from 'react';

export const viewport: Viewport = {
  themeColor: 'black',
};

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return children;
};

export default RootLayout;
