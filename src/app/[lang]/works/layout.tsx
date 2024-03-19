import { SideMenu } from "@/components/SideMenu";
import WorkMenuContent from "@/components/WorkMenuContent";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { FC, PropsWithChildren } from "react";

type Params = {
	lang: Locale;
};

type Props = PropsWithChildren<{
	params: Params;
}>;

const WorksLayout: FC<Props> = async (props) => {
	const { children, params } = props;
	const { lang } = params;

	const dictionary = await getDictionary(lang);

	const client = createClient();
	const workPages = await client.getAllByType<
		Content.WorkPostDocument & {
			data: {
				work: {
					data: Pick<Content.WorkDocument["data"], "duration" | "company">;
				};
			};
		}
	>("workPost", {
		lang,
		fetchLinks: ["work.company", "work.duration"],
	});

	return (
		<>
			<SideMenu isInner>
				<WorkMenuContent
					lang={lang}
					title={dictionary.menuItems.myWorks}
					workPages={workPages}
				/>
			</SideMenu>
			<div className="flex-1 relative">{children}</div>
		</>
	);
};

export default WorksLayout;
