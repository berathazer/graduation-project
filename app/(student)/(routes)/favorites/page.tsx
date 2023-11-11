import FavoriteCourseCard from "@/components/favorite-course-card";
import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import PageWrapper from "@/containers/PageWrapper";
import { currentProfile } from "@/lib/auth";
import { strokeWidth } from "@/lib/constant";
import db from "@/lib/db";
import { favoritesNavigation } from "@/lib/navigations";
import { Heart } from "lucide-react";
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
				{favorites.length === 0 && (
					<div className="flex w-full col-span-5 flex-col gap-y-4 items-center justify-center py-8">
						<div className="p-6 rounded-full flex items-center justify-center bg-slate-50">
							<Heart
								strokeWidth={strokeWidth}
								className="w-10 h-10 text-muted-foreground"
							/>
						</div>
						<div className="font-semibold text-lg md:text-xl text-black/80 text-center">
							Favorilerim listenizde hiç kurs bulunmamaktadır
						</div>
						<div className="text-muted-foreground font-light text-[.85rem] w-auto md:w-[420px] text-center">
							Favorilerim listenize kurs eklemek için kurslar üzerindeki kalbe tıklayarak
							favorilerim listenizi oluşturabilirsiniz.
						</div>
					</div>
				)}
				{favorites.map((fav) => (
					<FavoriteCourseCard
						key={fav.id}
						favorite={fav}
						isAuthenticated={!!profile}
					/>
				))}
			</div>
		</PageWrapper>
	);
};

export default Favorites;
