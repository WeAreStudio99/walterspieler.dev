import { SideMenu } from "@/components/SideMenu";
import WorkMenuContent from "@/components/WorkMenuContent";
import { Locale } from "@/lib/i18n/types";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { FC, PropsWithChildren } from "react";

type Params = {
	lang: Locale;
};

type Props = PropsWithChildren<{
	params: Params;
}>;

const WorkLayout: FC<Props> = async (props) => {
	const { children, params } = props;
	const { lang } = params;

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
				<WorkMenuContent lang={lang} workPages={workPages} />
			</SideMenu>
			<div className="flex-1">{children}</div>
		</>
	);
};

export default WorkLayout;
