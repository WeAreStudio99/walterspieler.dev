import Error404 from "@/components/NotFound";
import { cn } from "@/lib/utils";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function NotFound() {
	return (
		<html lang="en">
			<body
				className={cn(
					"h-screen w-screen",
					"bg-eerie-light",
					"text-white",
					"font-sans",
					spaceGrotesk.variable,
				)}
			>
				<Error404
					button={{
						label: "Return to home",
						path: "/",
					}}
				/>
			</body>
		</html>
	);
}
