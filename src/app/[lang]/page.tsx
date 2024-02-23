import { Locale } from "@/lib/i18n/types";
import { FC } from "react";

type Params = {
	lang: Locale;
};

type Props = {
	params: Params;
};

const HomeLang: FC<Props> = (props) => {
	const { params } = props;
	const { lang } = params;

	return (
		<div>
			<h1>Thibault Walterspieler ({lang})</h1>
			<p>Building fullstack applications</p>
		</div>
	);
};

export default HomeLang;
