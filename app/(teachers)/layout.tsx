import TeacherNavbar from "@/components/navbar/teacher-navbar";
import { Sidebar } from "@/components/sidebar/sidebar";
import { checkIsTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
	const { userId } = auth();
	const isTeacher = await checkIsTeacher(userId);
	if (!isTeacher) {
		return redirect("/");
	}

	return (
		<div className="h-full">
			<div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
				<TeacherNavbar />
			</div>
			<div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
				<Sidebar />
			</div>
			<main className="md:pl-56 pt-[80px] h-full">{children}</main>
		</div>
	);
};

export default TeacherLayout;
