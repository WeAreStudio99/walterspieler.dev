import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { Content } from "@prismicio/client";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type Props = {
	title: string;
	lang: Locale;
	uid: string;
	workPosts: (Content.WorkPostDocument & {
		data: {
			work: {
				data: Pick<Content.WorkDocument["data"], "duration" | "company">;
			};
		};
	})[];
};

const ArticleBreadcrumb: FC<Props> = async ({
	lang,
	title,
	workPosts,
	uid,
}) => {
	const dictionary = await getDictionary(lang);

	return (
		<Breadcrumb className="mb-5">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">
						{dictionary.firstLevelPages.home}
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-1">
							<Link href={lang === "en-gb" ? "/works" : `/${lang}/works`}>
								{dictionary.firstLevelPages.works}
							</Link>
							<ChevronDownIcon />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{workPosts.map((work, idx) => {
								const workData = work.data.work.data;
								const company = workData.company[0];

								if (work.uid === uid) {
									return null;
								}

								return (
									<DropdownMenuItem key={idx}>
										<Link
											href={
												lang !== "en-gb"
													? `/${lang}/works/${work.uid}`
													: `/works/${work.uid}`
											}
										>
											{company && company.name}
										</Link>
									</DropdownMenuItem>
								);
							})}
						</DropdownMenuContent>
					</DropdownMenu>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>{title}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default ArticleBreadcrumb;
