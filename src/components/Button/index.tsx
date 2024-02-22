import { CommonProps } from '@/lib/types';
import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  text: string;
} & CommonProps;

const Button: FC<Props> = (props) => {
  const { className, text } = props;
  return (
    	<button className={clsx(className, 'rounded-full ring-2 ring-gray-500 py-3 px-4')}>
      {text}
    </button>
  );
};

export default Button;
