import { FC } from "react";

import Error404 from "@/components/Common/Error404";

const NotFoundPage: FC = () => {
	return (
		<Error404
			button={{
				label: "Return to works",
				path: "/works",
			}}
			label="This work does not exist."
		/>
	);
};

export default NotFoundPage;
