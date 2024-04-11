import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { FC, PropsWithChildren, Suspense } from "react";

import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SideMenu from "@/components/Common/SideMenu";
import SideMenuContent from "@/components/Common/SideMenuContent";

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
			<SideMenu isInner lang={lang} collection="works" displayReturnButton>
				<Suspense fallback={<LoadingSpinner />}>
					<SideMenuContent
						lang={lang}
						title={dictionary.firstLevelPages.works}
						collection="works"
						data={workPages.map((work) => {
							const workData = work.data.work.data;
							const company = workData.company[0];

							const duration = workData.duration[0];

							return {
								title: company?.name || "",
								uid: work.uid,
								startDate: duration?.start,
								endDate: duration?.end,
							};
						})}
					/>
				</Suspense>
			</SideMenu>
			<div className="flex-1 relative">{children}</div>
		</>
	);
};

export default WorksLayout;
