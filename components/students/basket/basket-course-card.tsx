"use client";
import CourseRating from "@/components/courses/course-rating";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { strokeWidth } from "@/lib/constant";
import { formatProductPrice } from "@/lib/helpers";
import { urls } from "@/lib/urls";
import { SignedIn } from "@clerk/nextjs";
import { Chapter, Course, CourseFeature } from "@prisma/client";
import axios from "axios";
import { Router, TagIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface BasketCourseCard {
	course: Course & {
		courseFeature: CourseFeature;
		chapters: Chapter[];
	};
	isAuthenticated: boolean;
	basketId?: string;
}

const BasketCourseCard = ({ course, isAuthenticated, basketId }: BasketCourseCard) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const clickHandler = async () => {
		try {
			setIsLoading(true);
			if (isAuthenticated) {
				console.log("basketId:", basketId);
				//kullanıcı giriş yapmıştır basket tablosundan baskedIdyi silip refresh yapmalıyım.

				await axios.delete(`/api/profile/basket/${basketId}`);
				toast.success("Sepetten Kaldırıldı.");
				router.refresh();
			} else {
				console.log("courseId:", course.id);
				//kullanıcı giriş yapmamıştır basket cookiesinden courseId'yi silip refresh yapmalıyım.
			}
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	const moveToFavorite = async () => {
		setIsLoading(true);
		try {
			await axios.post(`/api/profile/favorites`, { courseId: course.id });
			await axios.delete(`/api/profile/basket/${basketId}`);

			toast.success("Favoriye Taşındı");
			router.refresh();
		} catch (error) {
			toast.error("Kurs Zaten Favorilerde");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex w-full gap-x-2">
			<Link
				href={`${urls.courses}/${course.url}`}
				className="flex  gap-x-3 pr-4"
			>
				<div className="relative w-32 h-20">
					<Image
						src={course.imageUrl!}
						alt={course.title}
						fill
					/>
				</div>
				<div className="flex flex-col gap-y-1">
					<p className="font-bold text-sm">{course.title}</p>
					<p className="text-xs  text-muted-foreground">{course.instructor}</p>
					<div className="flex gap-x-3">
						<CourseRating
							rating={4}
							size={12}
							color=""
						/>
						<Badge className="rounded-none hover:bg-black ">
							{course.courseFeature.difficulty}
						</Badge>
					</div>
					<div className="flex gap-x-2 py-2">
						<span className="text-xs text-muted-foreground">{`${course.chapters.length} Ders`}</span>
						<p className="w-1 h-1 rounded-full bg-slate-500 self-center"></p>
						<span className="text-xs text-muted-foreground">42 Saat</span>
					</div>
					<div className="flex gap-x-2 items-center">
						<span className="font-medium">{formatProductPrice(course.price || 0)}</span>
						<TagIcon
							className="w-4 h-4 text-emerald-500"
							strokeWidth={strokeWidth}
						/>
					</div>
				</div>
			</Link>

			<div className="flex  flex-col ml-auto items-end gap-y-2">
				<ConfirmModal
					onConfirm={clickHandler}
					title="Kursu Sepetten Kaldırmak İstediğinize Emin misiniz?"
					description={
						<p>
							Bu işlem, <strong>kursu</strong> sepetinizden kaldıracaktır.
						</p>
					}
					isLoading={isLoading}
				>
					<div className="flex flex-col items-end justify-center">
						<Button
							type="button"
							variant={"linkDelete"}
							className="py-0 px-4 h-6 text-rose-600"
							disabled={isLoading}
						>
							Sil
						</Button>
					</div>
				</ConfirmModal>

				<SignedIn>
					<div className="flex flex-col items-end justify-center">
						<Button
							type="button"
							variant={"showMore"}
							className="py-0 px-4 h-6 text-purple-600 whitespace-nowrap"
							disabled={isLoading}
							onClick={moveToFavorite}
						>
							Favoriye Taşı
						</Button>
					</div>
				</SignedIn>
			</div>
		</div>
	);
};

export default BasketCourseCard;
