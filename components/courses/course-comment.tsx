import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import CourseRating from "./course-rating";

export default function CourseComment() {
	return (
		<div className="mx-auto px-4 md:px-6 grid bg-white dark:bg-gray-800 rounded-lg shadow-md">
			<div className="flex gap-4 py-6 px-0">
				<Avatar className="w-14 h-14 border  bg-gray-300 dark:bg-gray-700 rounded-full">
					<AvatarImage
						alt="@john_doe"
						src="/placeholder-user.jpg"
					/>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
				<div className="grid gap-4">
					<div className="flex gap-4 items-start">
						<div className="grid gap-0.5 text-sm">
							<h3 className="font-semibold text-gray-900 dark:text-gray-200">John Doe</h3>
							<time className="text-gray-500 dark:text-gray-400">1 week ago</time>
						</div>
						<div className="flex items-center gap-0.5 ml-auto">
							<CourseRating rating={4} size={16} />
						</div>
					</div>
					<div className="text-sm leading-loose text-gray-600 dark:text-gray-400">
						<p>
							This course has been a breakthrough for me. The instructor was very clear and
							the material was easy to understand. Highly recommended!
						</p>
						<p>
							The assignments were challenging but fair, and I felt like I was constantly
							learning. The course materials and resources were outstanding. I feel much
							more confident in my skills after taking this course.The assignments were
							challenging but fair, and I felt like I was constantly learning. The course
							materials and resources were outstanding. I feel much more confident in my
							skills after taking this course.The assignments were challenging but fair,
							and I felt like I was constantly learning. The course materials and resources
							were outstanding. I feel much more confident in my skills after taking this
							course.The assignments were challenging but fair, and I felt like I was
							constantly learning. The course materials and resources were outstanding. I
							feel much more confident in my skills after taking this course.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
