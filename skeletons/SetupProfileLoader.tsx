import { Loader2 } from "lucide-react";
import React from "react";

const SetupProfileLoader = () => {
	return (
		<div className="w-full absolute top-0 h-screen flex items-center justify-center z-[9999] bg-white">
			<Loader2
				className="w-40 h-40 animate-spin text-slate-700"
				strokeWidth={".8"}
			/>
		</div>
	);
};

export default SetupProfileLoader;
