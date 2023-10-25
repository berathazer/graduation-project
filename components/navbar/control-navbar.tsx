"use client";
import { usePathname } from "next/navigation";
import React from "react";

interface ControlNavbarProps {
	children: React.ReactNode;
	isTeacher: boolean;
}
const ControlNavbar = ({ children, isTeacher }: ControlNavbarProps) => {
	const pathname = usePathname();
	if (pathname.startsWith("/teacher")) return null;

	return children;
};

export default ControlNavbar;
