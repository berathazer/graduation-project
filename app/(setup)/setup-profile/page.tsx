import { db } from "@/lib/db";
import { initialProfile } from "@/lib/profile";
import { redirect } from "next/navigation";

/* type Profile = {
	id: string;
	userId: string;
	name: string;
	imageUrl: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
}; */

const SetupProfilePage = async () => {
	const profile = await initialProfile();

	if (profile) {
		return redirect("/");
	}

	return null;
};

export default SetupProfilePage;
