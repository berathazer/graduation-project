import { moveBasketFromCookies } from "@/actions/move-basket-action";
import { initialProfile } from "@/lib/profile";

import { redirect } from "next/navigation";

const SetupProfilePage = async () => {
	const profile = await initialProfile();

	if (profile) {
		const res = await moveBasketFromCookies(profile.id);
		console.log("res:", res);
		return redirect("/");
	}

	return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
};

export default SetupProfilePage;
