import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return <div className="min-h-without_navbar md:p-6 py-6">{children}</div>;
};

export default MainLayout;
