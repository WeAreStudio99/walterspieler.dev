import { FC } from "react";

import Error404 from "@/components/Common/Error404";

const NotFoundPage: FC = () => {
	return (
		<Error404
			button={{
				label: "Return to blog",
				path: "/blog",
			}}
			label="This blog post does not exist."
		/>
	);
};

export default NotFoundPage;
