import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const ContentWrapper: FC<Props> = (props) => {
	const { children } = props;

	return (
		<div className="py-20 md:py-24 px-10 w-full content-wrapper">
			<div className="w-full mx-auto content">{children}</div>
		</div>
	);
};

export default ContentWrapper;
