import Error404 from "@/components/NotFound";
import { FC } from "react";

const NotFound: FC = () => {
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

export default NotFound;
