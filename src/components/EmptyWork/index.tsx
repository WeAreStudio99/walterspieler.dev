import { FC } from "react";

import "./_internal/style.css";

const EmptyWork: FC = () => {
	return (
		<div className="w-full h-full flex justify-center items-center emptyLayout">
			<span
				className="text-stone-400 text-2xl font-bold"
				data-testid="works-placeholder"
			>
				Select a work
			</span>
		</div>
	);
};

export default EmptyWork;
