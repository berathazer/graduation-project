import FavoriteCourseCard from "@/components/favorite-course-card";
import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
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
		<div className="p-6">
			<div className="px-4 md:px-12 lg:px-24 xl:px-40 2xl:px-60 flex flex-col gap-y-12 py-8">
				<p className="flex items-center justify-center font-medium text-3xl text-muted-foreground">
					Favoriler
				</p>
				<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 place-items-center gap-y-8 gap-x-5">
					{favorites.map((fav) => (
						<FavoriteCourseCard
							key={fav.id}
							favorite={fav}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Favorites;
