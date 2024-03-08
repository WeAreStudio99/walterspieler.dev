"use client";

import Error404 from "@/components/NotFound";
import { FC } from "react";

const NotFound: FC = () => {
	return (
		<Error404
			button={{
				label: "Return to works",
				path: "/works",
			}}
		/>
	);
};

export default NotFound;
