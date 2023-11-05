import { initialProfile } from "@/lib/profile";

import { redirect } from "next/navigation";

const SetupProfilePage = async () => {
	const profile = await initialProfile();

	if (profile) {
		return redirect("/");
	}

	return null;
};

export default SetupProfilePage;
