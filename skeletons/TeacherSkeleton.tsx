import { EditProfileFormSkeleton } from "@/components/teachers/instructor/edit-profile-form";
import React from "react";

const TeacherSkeleton = () => {
	return (
		<div className="p-6 flex flex-col gap-y-6">
			<div>
				<h3 className="text-lg font-bold">Profil</h3>
				<p className="text-sm text-muted-foreground">
					Başkaları sizi kurslarınızda ve profilinizde bu şekilde görecektir.
				</p>
			</div>
			<EditProfileFormSkeleton />
		</div>
	);
};

export default TeacherSkeleton;
