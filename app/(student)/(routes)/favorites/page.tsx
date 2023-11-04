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
			course: true,
		},
	});

	return (
		<div className="p-6">
			<pre>{JSON.stringify(favorites, null, 4)}</pre>
		</div>
	);
};

export default Favorites;
