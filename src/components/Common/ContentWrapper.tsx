import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const ContentWrapper: FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="content-wrapper w-full px-10 py-20 md:py-24">
      <div className="content mx-auto w-full">{children}</div>
    </div>
  );
};

export default ContentWrapper;
