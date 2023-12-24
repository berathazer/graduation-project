import HomeContainer from "@/containers/HomeContainer";
import SetupProfileLoader from "@/skeletons/SetupProfileLoader";
import { Suspense } from "react";

export default async function Home() {
	return (
		<Suspense fallback={<SetupProfileLoader />}>
			<HomeContainer />
		</Suspense>
	);
}
