"use client";

import ThreeJSVisualization from "@/lib/webgl";
import { FC, useEffect, useRef } from "react";

const ThreeInitializer: FC = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		if (canvasRef.current) {
			const threeJSVisualization = new ThreeJSVisualization({
				dom: canvasRef.current,
			});
		}
	}, []);

	return <div className="absolute w-screen h-screen z-0" ref={canvasRef} />;
};

export default ThreeInitializer;
