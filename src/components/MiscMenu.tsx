import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import Link from "next/link";
import { FC } from "react";

type Props = {
	lang: Locale;
};

const MiscMenu: FC<Props> = async ({ lang }) => {
	const dictionary = await getDictionary(lang);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">{dictionary.menuItems.other}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-56">
				<DropdownMenuLabel>
					Thibault Walterspieler - {new Date().getFullYear()}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link href="/legal/notice">{dictionary.menuItems.legalNotice}</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href="/open-source">Open source</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default MiscMenu;
