import { AttachmentForm } from "@/components/course-edit/attachment-form";
import { CategoryForm } from "@/components/course-edit/category-form";
import { ChaptersForm } from "@/components/course-edit/chapters-form";
import { DescriptionForm } from "@/components/course-edit/description-form";
import { ImageForm } from "@/components/course-edit/image-form";
import { PriceForm } from "@/components/course-edit/price-form";
import { TitleForm } from "@/components/course-edit/title-form";
import { IconBadge } from "@/components/icon-badge";
import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";

import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import React from "react";

const SingleCoursePage = async ({ params }: { params: { courseId: string } }) => {
	/* const categories = await db.category.findMany({
		where: {
			parentId: {
				equals: null,
			},
		},
	}); */

	const categories = await db.category.findMany();

	const profile = await currentProfile();
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
		},
	});

	const requiredFields = [
		course?.title,
		course?.description,
		course?.imageUrl,
		course?.price,
		course?.categoryId,
		course?.chapters.some((chapter) => chapter.isPublished),
	];

	const totalFields = requiredFields.length;
	const completedFields = requiredFields.filter(Boolean).length;
	const completionText = `(${completedFields} / ${totalFields})`;

	return (
		<div className="p-6 flex flex-col gap-y-16">
			<div className="flex items-center justify-between">
				{" "}
				<div className="flex flex-col gap-y-2">
					<h1 className="text-2xl font-medium">Kurs Oluşturun</h1>
					<span className="text-sm text-slate-700">
						Tüm Alanları Doldurun {completionText}
					</span>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
				{/* Başlık,Açıklama,Resim,Kategori */}
				<div className="pb-60">
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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
				<div className="pb-60">
					<div className="flex items-center gap-x-2">
						<IconBadge icon={LayoutDashboard} />
						<h2 className="text-xl">Kursta Neler Öğretilecek</h2>
					</div>
					<div>Bu kısımdada öğretmen kursta neler öğrenileceğini ekleyecek</div>
				</div>

				<div className="space-y-6">
					<div>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={ListChecks} />
							<h2 className="text-xl">Kursun Genel Bilgileri</h2>
						</div>
						<div>Bu kısımdada kursun genel bilgileri eklenecek.</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleCoursePage;
