import React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="px-4 md:px-12 lg:px-24 xl:px-40 2xl:px-60 flex flex-col gap-y-10 py-4">
			{children}
		</div>
	);
};

export default PageWrapper;
