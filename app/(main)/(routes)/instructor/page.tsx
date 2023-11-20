import InstructorContainer from "@/containers/InstructorContainer";
import { currentProfile } from "@/lib/auth";
import InstructorSkeleton from "@/skeletons/InstructorSkeleton";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const InstructorPage = async () => {
	const profile = await currentProfile();
	if (!profile) {
		return redirectToSignIn();
	}
	if(profile.role !== "STUDENT"){
		return redirect("/")
	}
	return (
		<Suspense fallback={<InstructorSkeleton />}>
			<InstructorContainer profile={profile!} />
		</Suspense>
	);
};

export default InstructorPage;
