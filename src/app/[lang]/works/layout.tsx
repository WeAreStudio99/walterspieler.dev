import { SideMenu } from "@/components/SideMenu";
import WorkMenuContent from "@/components/WorkMenuContent";
import { Locale } from "@/lib/i18n/types";
import { FC, PropsWithChildren } from "react";

type Params = {
	lang: Locale;
};

type Props = PropsWithChildren<{
	params: Params;
}>;

const WorkLayout: FC<Props> = (props) => {
	const { children, params } = props;
	const { lang } = params;

	return (
		<>
			<SideMenu isInner>
				<WorkMenuContent lang={lang} />
			</SideMenu>
			<div className="flex-1">{children}</div>
		</>
	);
};

export default WorkLayout;
