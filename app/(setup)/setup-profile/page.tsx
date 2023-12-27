import { moveBasketFromCookies } from "@/actions/move-basket-action";

import { initialProfile } from "@/lib/profile";

import { redirect } from "next/navigation";

const SetupProfilePage = async () => {
	const profile = await initialProfile();

	if (profile) {
		await moveBasketFromCookies(profile.id);
		return redirect("/");
	}
};

export default SetupProfilePage;
