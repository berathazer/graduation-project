import { Banner } from "@/components/banner";
import { ChapterAccessForm } from "@/components/chapter-edit/chapter-access-form";
import { ChapterActions } from "@/components/chapter-edit/chapter-actions";
import { ChapterDescriptionForm } from "@/components/chapter-edit/chapter-description-form";
import { ChapterTitleForm } from "@/components/chapter-edit/chapter-title-form";
import { ChapterVideoForm } from "@/components/chapter-edit/chapter-video-form";
import { IconBadge } from "@/components/icon-badge";
import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ChapterIdPage = async ({ params }: { params: { courseId: string; chapterId: string } }) => {
	const profile = await currentProfile();

	if (!profile) {
		return redirect("/");
	}

	const chapter = await db.chapter.findUnique({
		where: {
			id: params.chapterId,
			courseId: params.courseId,
		},
		include: {
			muxData: true,
		},
	});

	if (!chapter) {
		return redirect("/");
	}

	const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

	const totalFields = requiredFields.length;
	const completedFields = requiredFields.filter(Boolean).length;

	const completionText = `(${completedFields} / ${totalFields})`;

	const isComplete = requiredFields.every(Boolean);

	return (
		<>
			{chapter.isPublished ? (
				<Banner label="Bölüm Yayında" variant={"success"} />
			) : (
				<Banner label="Bu bölüm henüz yayınlanmadı." />
			)}

			<div className="pt-6 pb-16 px-6">
				<div className="flex items-center justify-between">
					<div className="w-full">
						<Link
							href={`/teacher/courses/${params.courseId}`}
							className="flex items-center text-sm hover:opacity-75 transition mb-6"
						>
							<ArrowLeft className="h-4 w-4 mr-2" />
							Kurs Hazırlamaya Geri Dönün
						</Link>

						<div className="flex items-center justify-between w-full">
							<div className="flex flex-col gap-y-2">
								<h1 className="text-2xl font-medium">Bölüm Oluşturma</h1>
								<span className="text-sm text-slate-700">
									Tüm Gerekli Alanları Doldurun {completionText}
								</span>
							</div>
							<ChapterActions
								disabled={!isComplete}
								courseId={params.courseId}
								chapterId={params.chapterId}
								isPublished={chapter.isPublished}
							/>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
					<div className="space-y-6">
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={LayoutDashboard} />
								<h2 className="text-xl">Bölüm Başlığını Özelleştirin</h2>
							</div>
							<ChapterTitleForm
								initialData={chapter}
								courseId={params.courseId}
								chapterId={params.chapterId}
							/>
							<ChapterDescriptionForm
								initialData={chapter}
								courseId={params.courseId}
								chapterId={params.chapterId}
							/>
						</div>

						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={Eye} />
								<h2 className="text-xl">Erişim Ayarları</h2>
							</div>
							<ChapterAccessForm
								initialData={chapter}
								courseId={params.courseId}
								chapterId={params.chapterId}
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={Video} />
							<h2 className="text-xl">Video Ekleyin</h2>
						</div>
						<ChapterVideoForm
							initialData={chapter}
							chapterId={params.chapterId}
							courseId={params.courseId}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChapterIdPage;
