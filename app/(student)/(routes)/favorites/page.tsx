import FavoriteCourseCard from "@/components/favorite-course-card";
import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import PageWrapper from "@/containers/PageWrapper";
import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { favoritesNavigation } from "@/lib/navigations";
import React from "react";

const Favorites = async () => {
	const profile = await currentProfile();
	const favorites = await db.favorite.findMany({
		where: {
			profileId: profile?.id,
		},
		include: {
			course: {
				include: {
					category: true,
				},
			},
		},
	});

	return (
		<PageWrapper>
			<NavigationBreadcrumb
				title="Favoriler"
				navigations={favoritesNavigation}
			/>

			<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 place-items-center gap-y-8 gap-x-5">
				{favorites.map((fav) => (
					<FavoriteCourseCard
						key={fav.id}
						favorite={fav}
					/>
				))}
			</div>
		</PageWrapper>
	);
};

export default Favorites;
