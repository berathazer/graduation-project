"use client";
import { usePathname } from "next/navigation";
import React from "react";

interface ControlNavbarProps {
	children: React.ReactNode;
}
const ControlNavbar = ({ children }: ControlNavbarProps) => {
	const pathname = usePathname();
	if (pathname.startsWith("/teacher") || pathname.startsWith("/admin") || pathname.startsWith("/learning")) return null;

	return children;
};

export default ControlNavbar;
