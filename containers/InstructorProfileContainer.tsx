import EditProfileForm from "@/components/teachers/instructor/edit-profile-form";
import { currentProfileWithInstructor } from "@/lib/instructor";

import React from "react";

const InstructorProfileContainer = async () => {
	const profile = await currentProfileWithInstructor();

	return (
		<div className="p-6 flex flex-col gap-y-6">
			<div>
				<h3 className="text-lg font-bold">Profil</h3>
				<p className="text-sm text-muted-foreground">
					Başkaları sizi kurslarınızda ve profilinizde bu şekilde görecektir.
				</p>
			</div>
			<EditProfileForm
				instructor={profile?.instructor!}
				profileId={profile?.id || ""}
			/>
		</div>
	);
};

export default InstructorProfileContainer;
