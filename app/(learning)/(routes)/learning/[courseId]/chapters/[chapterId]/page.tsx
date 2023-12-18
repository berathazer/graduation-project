import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/chapter-action";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/preview";

/* import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button"; */
import { currentProfile } from "@/lib/auth";
import { VideoPlayer } from "@/components/video-player";
import { CourseEnrollButton } from "@/components/learning/course-enroll-button";
import { CourseProgressButton } from "@/components/learning/course-progress-button";

interface LearningChapterIdPageProps {
	params: { courseId: string; chapterId: string };
}

const LearningChapterIdPage = async ({ params }: LearningChapterIdPageProps) => {
	const profile = await currentProfile();
	if (!profile) {
		return redirect("/");
	}

	const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase } =
		await getChapter({
			profileId: profile.id,
			chapterId: params.chapterId,
			courseId: params.courseId,
		});
	console.log("chapter:", chapter, muxData);

	/* if (!chapter || !course) {
		return redirect("/");
	} */

	const isLocked = !chapter?.isFree && !purchase;
	
	const completeOnEnd = !!purchase && !userProgress?.isCompleted;
	console.log("course:", course);
	
	return (
		<div className="">
			{userProgress?.isCompleted && (
				<Banner
					variant="success"
					label="You already completed this chapter."
				/>
			)}
			{isLocked && (
				<Banner
					variant="warning"
					label="You need to purchase this course to watch this chapter."
				/>
			)}
			<div className="flex flex-col mx-auto pb-20 p-4 ">
				<div
					id="videoplayer"
					className=""
				>
					<VideoPlayer
						chapterId={params.chapterId}
						title={chapter?.title}
						courseId={params.courseId}
						nextChapterId={nextChapter?.id}
						playbackId={muxData?.playbackId!}
						isLocked={isLocked}
						completeOnEnd={completeOnEnd}
					/>
				</div>
				<div className="flex flex-col gap-y-4 mt-6">
					<div className="p-4 flex flex-col md:flex-row items-center justify-between border rounded-md">
						<h2 className="text-2xl font-semibold mb-2">{chapter?.title}</h2>
						{purchase ? (
							<CourseProgressButton
								chapterId={params.chapterId}
								courseId={params.courseId}
								nextChapterId={nextChapter?.id}
								isCompleted={!!userProgress?.isCompleted}
							/>
						) : (
							<CourseEnrollButton
								courseId={params.courseId}
								price={course?.price!}
							/>
						)}
					</div>
					
					<div>
						<Preview value={chapter?.description!} />
					</div>
					{!!attachments.length && (
						<>
							<Separator />
							<div className="p-4">
								{attachments.map((attachment) => (
									<a
										href={attachment.url}
										target="_blank"
										key={attachment.id}
										className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
									>
										<File />
										<p className="line-clamp-1">{attachment.name}</p>
									</a>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default LearningChapterIdPage;
