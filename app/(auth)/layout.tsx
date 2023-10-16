import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return <div className="w-full min-h-without_navbar bg-slate-50 flex items-center justify-center">{children}</div>;
};

export default AuthLayout;
