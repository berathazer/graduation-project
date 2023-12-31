import React from "react";
import PageWrapper from "./PageWrapper";
import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import { myCoursesNavigation } from "@/lib/navigations";
import { Tv } from "lucide-react";
import { strokeWidth } from "@/lib/constant";
import Link from "next/link";
import { urls } from "@/lib/urls";
import db from "@/lib/db";
import MyCourseCard from "@/components/students/my-courses/my-course-card";

const MyCoursesContainer = async ({ profileId }: { profileId?: string }) => {
	const purchases = await db.purchase.findMany({
		where: {
			profileId: profileId || "",
		},
		include: {
			course: true,
		},
	});

	return (
		<PageWrapper>
			<NavigationBreadcrumb
				title="Kurslarım"
				navigations={myCoursesNavigation}
			/>
			{purchases.length === 0 && (
				<div className="flex w-full flex-col gap-y-4 items-center justify-center py-8 ">
					<div className="p-6 rounded-full flex items-center justify-center bg-slate-50">
						<Tv
							strokeWidth={strokeWidth}
							className="w-10 h-10 text-muted-foreground"
						/>
					</div>
					<div className="font-semibold text-lg md:text-xl text-black/80 text-center">
						Sahip olduğunuz hiç kurs bulunmamaktadır.
					</div>
					<div className="text-muted-foreground font-light text-[.85rem] w-auto md:w-[420px] text-center ">
						Beğendiğiniz kursları sepetinize ekleyerek satın alabilirsiniz. Kurslara göz
						atmak için{" "}
						<Link
							href={urls.courses}
							className="underline"
						>
							tıklayın.
						</Link>
					</div>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
				{purchases.map((p) => (
					<MyCourseCard
						key={p.courseId}
						course={p.course}
						profileId={profileId}
					/>
				))}
			</div>
		</PageWrapper>
	);
};

export default MyCoursesContainer;
