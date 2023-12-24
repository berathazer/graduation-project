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
			<div className="flex flex-col mx-auto p-4 ">
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
				<div className="flex flex-col gap-y-4 mt-6 px-0 lg:px-12 xl:px-20">
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
							<div className="py-4 flex flex-col gap-y-4">
								<p className="text-muted-foreground text-2xl">Kurs Belgeleri</p>
								{attachments.map((attachment) => (
									<a
										href={attachment.url}
										target="_blank"
										key={attachment.id}
										className="flex items-center gap-x-4 p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
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
