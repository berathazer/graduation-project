import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { formatJoinDate, formatReviewDate } from "@/lib/helpers";
import { Rating } from "@smastrom/react-rating";

interface CourseCommentProps {
	imageUrl: string;
	name: string;
	comment: string;
	rating: number;
	createdAt: Date;
}

export default function CourseComment({
	comment,
	imageUrl,
	name,
	rating,
	createdAt,
}: CourseCommentProps) {
	return (
		<div className="mx-auto px-4 md:px-6 grid bg-white dark:bg-gray-800 rounded-lg shadow-md">
			<div className="flex gap-4 py-6 px-0">
				<Avatar className="w-14 h-14 border  bg-gray-300 dark:bg-gray-700 rounded-full">
					<AvatarImage
						alt={`@${name}`}
						src={imageUrl}
					/>
					<AvatarFallback>{name[0]}</AvatarFallback>
				</Avatar>
				<div className="grid gap-4 w-full">
					<div className="flex gap-4 items-start">
						<div className="grid gap-0.5 text-sm">
							<h3 className="font-semibold text-gray-900 dark:text-gray-200">{name}</h3>
							<time className="text-gray-500 dark:text-gray-400">
								{formatReviewDate(createdAt)}
							</time>
						</div>
						<div className="flex items-center gap-0.5 ml-auto">
							<Rating
								readOnly
								value={rating}
								className="max-w-[80px]"
							/>
						</div>
					</div>
					<div className="text-sm leading-loose text-gray-600 dark:text-gray-400">
						<p>{comment}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
