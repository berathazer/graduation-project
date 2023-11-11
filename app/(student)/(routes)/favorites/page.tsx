import FavoritesContainer from "@/containers/FavoritesContainer";
import { currentProfile } from "@/lib/auth";
import FavoritesSkeleton from "@/skeletons/FavoritesSkeleton";
import { Suspense } from "react";

const Favorites = async () => {
	const profile = await currentProfile();

	return (
		<Suspense fallback={<FavoritesSkeleton />}>
			<FavoritesContainer profileId={profile?.id} />
		</Suspense>
	);
};

export default Favorites;
