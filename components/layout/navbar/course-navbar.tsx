import { Chapter, Course, UserProgress } from "@prisma/client";

import { CourseMobileSidebar } from "./course-mobile-sidebar";
import TeacherNavbar from "./teacher-navbar";
import StudentNavbar from "./student-navbar";

interface CourseNavbarProps {
	course: Course & {
		chapters: (Chapter & {
			userProgress: UserProgress[] | null;
		})[];
	};
	progressCount: number;
}

export const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
	return (
		<div className="p-4 border-b h-full  flex items-center justify-between bg-white shadow-sm">
			<CourseMobileSidebar
				course={course}
				progressCount={progressCount}
			/>
			<StudentNavbar/>
		</div>
	);
};
