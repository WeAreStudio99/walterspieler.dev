import ContentWrapper from "@/components/ContentWrapper";
import EmptyWork from "@/components/EmptyWork";
import { H1 } from "@/components/Typography";
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
				<ContentWrapper>
					<H1>Works</H1>
					<WorksList lang={lang} />
				</ContentWrapper>
			</div>
		</>
	);
};

export default Works;
