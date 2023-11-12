import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full min-h-without_navbar flex items-center justify-center py-16">
			{children}
		</div>
	);
};

export default AuthLayout;
