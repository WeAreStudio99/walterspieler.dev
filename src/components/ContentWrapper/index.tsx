import { FC, PropsWithChildren } from "react";

import "./_internal/style.css";

type Props = PropsWithChildren;

const ContentWrapper: FC<Props> = ({ children }) => {
	return (
		<div className=" py-20 md:py-24 px-10 w-full wrapper">
			<div className="w-full mx-auto content">{children}</div>
		</div>
	);
};

export default ContentWrapper;
