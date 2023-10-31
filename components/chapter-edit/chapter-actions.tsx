"use client";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { ConfirmModal } from "../modals/confirm-modal";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ChapterActionsProps {
	disabled: boolean;
	courseId: string;
	chapterId: string;
	isPublished: boolean;
}
export const ChapterActions = ({ chapterId, courseId, disabled, isPublished }: ChapterActionsProps) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const onClick = async () => {
		try {
			setIsLoading(true);

			if (!isPublished) {
				await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
				toast.success("Bölüm yayınlandı.");
			} else {
				await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
				toast.success("Bölüm yayından kaldırıldı.");
			}
			router.refresh();
		} catch (error) {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		} finally {
			setIsLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setIsLoading(true);
			await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
			toast.success("Bölüm başarıyla silindi");
			router.refresh();
			router.push(`/teacher/courses/${courseId}`);
		} catch (error) {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		} finally {
			setIsLoading(true);
		}
	};

	return (
		<div className="flex items-center gap-x-2">
			<Button
				onClick={onClick}
				disabled={disabled || isLoading}
				variant={"outline"}
				size={"sm"}
			>
				{!isPublished ? "Yayınla" : "Yayından Kaldır"}
			</Button>

			<ConfirmModal onConfirm={onDelete}>
				<Button size={"sm"}>
					<Trash className="w-4 h-4" />
				</Button>
			</ConfirmModal>
		</div>
	);
};
