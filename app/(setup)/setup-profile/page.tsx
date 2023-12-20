import { moveBasketFromCookies } from "@/actions/move-basket-action";

import { initialProfile } from "@/lib/profile";
import SetupProfileLoader from "@/skeletons/SetupProfileLoader";

import { redirect } from "next/navigation";
import { Suspense } from "react";

const SetupProfilePage = async () => {
	return (
		<Suspense fallback={<SetupProfileLoader />}>
			<SetupProfile />
		</Suspense>
	);
};

export default SetupProfilePage;

const SetupProfile = async () => {
	const profile = await initialProfile();

	if (profile) {
		await moveBasketFromCookies(profile.id);
		return redirect("/");
	}
};
/* 
const delay = (ms: number) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			//@ts-ignore
			resolve();
		}, ms);
	});
};
 */
