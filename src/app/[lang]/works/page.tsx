import { getLocales } from "@/lib/locales";
import { createClient } from "@/prismicio";
import { FC } from "react";

export async function generateStaticParams() {
	const client = createClient();
	const page = await client.getSingle("works");
	const locales = await getLocales(page, client);

	return locales.map((locale) => {
		return {
			lang: locale.lang,
		};
	});
}

const Works: FC = () => {
	return (
		<div>
			<h1>Works</h1>
		</div>
	);
};

export default Works;
