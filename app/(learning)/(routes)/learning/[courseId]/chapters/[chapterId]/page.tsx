import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/chapter-action";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/preview";

import { currentProfile } from "@/lib/auth";
import { VideoPlayer } from "@/components/video-player";
import { CourseEnrollButton } from "@/components/learning/course-enroll-button";
import { CourseProgressButton } from "@/components/learning/course-progress-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CourseTabmenu from "@/components/layout/sidebar/course-tabmenu";

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

	if (!chapter || !course) {
		return redirect("/");
	}

	const isLocked = !chapter?.isFree && !purchase;

	const completeOnEnd = !!purchase && !userProgress?.isCompleted;

	return (
		<div className="">
			{userProgress?.isCompleted && (
				<Banner
					variant="success"
					label="Bu bölümü daha önce izlediniz."
				/>
			)}
			{isLocked && (
				<Banner
					variant="warning"
					label="Bu bölümü izlemek için bu kursu satın almanız gerekmektedir."
				/>
			)}
			<div className="flex flex-col mx-auto p-4 pb-20">
				<div
					id="videoplayer"
					className="flex flex-col gap-y-4"
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

				<div className="flex flex-col gap-y-4 mt-6 px-0 lg:px-12 xl:px-20">
					<div className="p-4 flex flex-col md:flex-row items-center justify-between border rounded-md">
						<CourseTabmenu
							chapter={chapter}
							reviews={course.reviews}
							courseId={course.id}
							attachments={attachments}
						>
							<div className="mt-6">
								<div className="flex items-center justify-between">
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
								<div className="flex flex-col gap-y-2 mt-4">
									<Preview value={chapter?.description!} />
								</div>
							</div>
						</CourseTabmenu>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LearningChapterIdPage;
