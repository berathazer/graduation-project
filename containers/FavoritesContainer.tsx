import FavoriteCourseCard from "@/components/favorite-course-card";
import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import PageWrapper from "@/containers/PageWrapper";

import { strokeWidth } from "@/lib/constant";
import db from "@/lib/db";
import { favoritesNavigation } from "@/lib/navigations";
import { Heart } from "lucide-react";
import React from "react";
interface FavoritesContainerProps {
	profileId?: string;
}

const FavoritesContainer = async ({ profileId }: FavoritesContainerProps) => {
	const favorites = await db.favorite.findMany({
		where: {
			profileId: profileId || "",
		},
		include: {
			course: {
				include: {
					category: true,
					chapters: true,
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

			<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 place-items-center  gap-y-8 gap-x-5 ">
				{favorites.length === 0 ? (
					<div className="flex w-full flex-col gap-y-4 items-center justify-center col-span-4 py-8">
						<div className="p-6 rounded-full flex items-center justify-center bg-slate-50">
							<Heart
								strokeWidth={strokeWidth}
								className="w-10 h-10 text-muted-foreground"
							/>
						</div>
						<div className="font-semibold text-lg md:text-xl text-black/80 text-center">
							Favorilerim listenizde hiç kurs bulunmamaktadır
						</div>
						<p className="text-muted-foreground font-light text-[.85rem]  w-auto md:w-[420px]  text-center">
							Favorilerim listenize kurs eklemek için kurslar üzerindeki kalbe tıklayarak
							favorilerim listenizi oluşturabilirsiniz.
						</p>
					</div>
				) : (
					favorites.map((fav) => (
						<FavoriteCourseCard
							key={fav.id}
							favorite={fav}
						/>
					))
				)}
			</div>
		</PageWrapper>
	);
};

export default FavoritesContainer;
