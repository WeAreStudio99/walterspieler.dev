import "@/styles/globals.css";

import { FC, PropsWithChildren } from "react";

import type { Viewport } from "next";

export const viewport: Viewport = {
	themeColor: "black",
};

const RootLayout: FC<PropsWithChildren> = (props) => {
	const { children } = props;

	return children;
};

export default RootLayout;
