import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

import { CourseSidebar } from "@/components/layout/sidebar/course-sidebar";
import { CourseNavbar } from "@/components/layout/navbar/course-navbar";
import { currentProfile } from "@/lib/auth";

const CourseLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { courseId: string };
}) => {
	const profile = await currentProfile();

	if (!profile) {
		return redirect("/");
	}

	const course = await db.course.findUnique({
		where: {
			id: params.courseId,
		},
		include: {
			chapters: {
				where: {

				},
				include: {
					userProgress: {
						where: {
							profileId: profile.id,
						},
					},
				},
				orderBy: {
					position: "asc",
				},
			},
		},
	});

	if (!course) {
		return redirect("/");
	}

	const progressCount = await getProgress(profile.id, course.id);
	console.log(course.chapters);

	return (
		<div className="h-full">
			<div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
				<CourseNavbar
					course={course}
					progressCount={progressCount}
				/>
			</div>
			<div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
				<CourseSidebar
					course={course}
					progressCount={progressCount}
				/>
			</div>
			<main className="md:pl-80 pt-[80px] h-full">{children}</main>
		</div>
	);
};

export default CourseLayout;
