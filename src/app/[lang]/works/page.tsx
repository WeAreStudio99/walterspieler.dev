import EmptyWork from "@/components/EmptyWork";
import WorksList from "@/components/WorksList";
import { Locale } from "@/lib/i18n/types";
import { FC } from "react";

type Params = {
	lang: Locale;
	uid: string;
};

type Props = {
	params: Params;
};

const Works: FC<Props> = (props) => {
	const { params } = props;
	const { lang } = params;

	return (
		<>
			<EmptyWork lang={lang} />
			<div className="flex-1 md:hidden">
				<WorksList lang={lang} />
			</div>
		</>
	);
};

export default Works;
