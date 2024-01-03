import { Banner } from "@/components/banner";
import { AttachmentForm } from "@/components/teachers/course-edit/attachment-form";
import { CategoryForm } from "@/components/teachers/course-edit/category-form";
import { ChaptersForm } from "@/components/teachers/course-edit/chapters-form";
import { CourseActions } from "@/components/teachers/course-edit/course-actions";
import { DescriptionForm } from "@/components/teachers/course-edit/description-form";
import { DifficultyForm } from "@/components/teachers/course-edit/difficulty-form";
import { FeatureDescriptionForm } from "@/components/teachers/course-edit/feature-description-form";
import { ImageForm } from "@/components/teachers/course-edit/image-form";
import { LearningOutcomeForm } from "@/components/teachers/course-edit/learning-outcome-form";
import { PriceForm } from "@/components/teachers/course-edit/price-form";
import { TitleForm } from "@/components/teachers/course-edit/title-form";
import { IconBadge } from "@/components/icon-badge";
import { Separator } from "@/components/ui/separator";

import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";

import { ArrowLeft, CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import Link from "next/link";
import React from "react";

const SingleCoursePage = async ({ params }: { params: { courseId: string } }) => {
	/* const categories = await db.category.findMany({
		where: {
			parentId: {
				equals: null,
			},
		},
	}); */

	const getCategories = db.category.findMany();

	const getProfile = currentProfile();

	const [categories, profile] = await Promise.all([getCategories, getProfile]);

	const course = await db.course.findUnique({
		where: {
			id: params.courseId,
			profileId: profile?.id,
		},
		include: {
			category: true,
			chapters: {
				orderBy: {
					position: "asc",
				},
			},
			attachments: {
				orderBy: {
					createdAt: "desc",
				},
			},
			courseLearningOutcome: {
				orderBy: {
					order: "asc",
				},
			},
			courseFeature: true,
		},
	});

	const requiredFields = [
		course?.title,
		course?.description,
		course?.imageUrl,
		course?.price,
		course?.categoryId,
		course?.chapters.some((chapter) => chapter.isPublished),
		course?.courseFeature?.description,
	];

	const totalFields = requiredFields.length;
	const completedFields = requiredFields.filter(Boolean).length;
	const completionText = `(${completedFields} / ${totalFields})`;
	const isCompleted = requiredFields.every(Boolean);
	return (
		<>
			{!course?.isPublished ? (
				<Banner
					variant={"warning"}
					label="Kurs Yayında Değil"
				/>
			) : (
				<Banner
					variant={"success"}
					label="Kurs Yayında"
				/>
			)}

			<div className="p-6 flex flex-col gap-y-10">
				<div className="flex flex-col">
					<Link
						href={`/teacher/courses`}
						className="flex w-max  items-center text-sm hover:opacity-75 transition mb-6"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Geri Dön
					</Link>
					<div className="flex items-center justify-between">
						<div className="flex flex-col gap-y-2">
							<h1 className="text-2xl font-medium">Kurs Oluşturun</h1>
							<span className="text-sm text-slate-700">
								Tüm Alanları Doldurun {completionText}
							</span>
						</div>
						<CourseActions
							disabled={!isCompleted}
							courseId={params.courseId}
							isPublished={course?.isPublished}
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
					{/* Başlık,Açıklama,Resim,Kategori */}
					<div className="">
						<div className="flex items-center gap-x-2">
							<IconBadge icon={LayoutDashboard} />
							<h2 className="text-xl">Kursunuzu Özelleştirin</h2>
						</div>
						<TitleForm
							courseId={params.courseId}
							initialData={course}
						/>
						<DescriptionForm
							courseId={params.courseId}
							initialData={course}
						/>
						<ImageForm
							initialData={course}
							courseId={params.courseId}
						/>

						<CategoryForm
							initialData={course}
							courseId={params.courseId}
							options={categories.map((category) => ({
								label: category.name,
								value: category.id,
							}))}
						/>
					</div>

					{/* Bölüm,Ücret,Belgeler */}
					<div className="space-y-6">
						{/* Bölümler */}
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={ListChecks} />
								<h2 className="text-xl">Kurs Bölümlerini Özelleştirin</h2>
							</div>
							<ChaptersForm
								initialData={course}
								courseId={params.courseId}
							/>
						</div>

						{/* Ücret */}
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={CircleDollarSign} />
								<h2 className="text-xl">Kursunuzun Fiyatını Belirleyin</h2>
							</div>
							<PriceForm
								initialData={course}
								courseId={params.courseId}
							/>
						</div>

						{/* Belgeler */}
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={File} />
								<h2 className="text-xl">Kaynaklar & Belgeler </h2>
							</div>
							<AttachmentForm
								initialData={course}
								courseId={params.courseId}
							/>
						</div>
					</div>
				</div>

				<Separator />

				<div
					className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8"
					id="secondPart"
				>
					{/* CourseLearningOutcome Alanı */}
					<div className="pb-60">
						<div className="flex items-center gap-x-2">
							<IconBadge icon={LayoutDashboard} />
							<h2 className="text-xl">Kursta Neler Öğretilecek</h2>
						</div>
						<div className="flex flex-col mt-4 ">
							<p className="text-sm font-normal text-muted-foreground">
								Bu kısımda öğrencilere neler öğretileceğini ekleyiniz.
							</p>
							<LearningOutcomeForm
								initialData={course?.courseLearningOutcome}
								courseId={course?.id}
							/>
						</div>
					</div>

					{/* CourseFeature Alanı */}
					<div className="space-y-6">
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={ListChecks} />
								<h2 className="text-xl">Kursun Genel Bilgileri</h2>
							</div>
							<div className="flex flex-col mt-4 ">
								<p className="text-sm font-normal text-muted-foreground">
									Bu kısımda öğrencilere neler öğretileceğini ekleyiniz.
								</p>

								<DifficultyForm
									initialData={course?.courseFeature}
									courseId={course?.id}
									featureId={course?.courseFeature?.id}
								/>
								<FeatureDescriptionForm
									initialData={course?.courseFeature}
									courseId={course?.id}
									featureId={course?.courseFeature?.id}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleCoursePage;
