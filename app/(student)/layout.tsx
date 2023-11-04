import React from "react";

const StudentLayout = ({ children }: { children: React.ReactNode }) => {
	return <div className="min-h-without_navbar">{children}</div>;
};

export default StudentLayout;
