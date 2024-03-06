"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		capture_pageview: true,
		persistence: "memory",
	});
}

export function PHProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	if (process.env.NODE_ENV === "development") {
		return <>{children}</>;
	}

	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
