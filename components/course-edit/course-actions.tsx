"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti";

interface CourseActionsProps {
	disabled: boolean;
	courseId: string;
	isPublished: boolean | undefined;
}

export const CourseActions = ({ disabled, courseId, isPublished }: CourseActionsProps) => {
	const router = useRouter();
	const onOpen = useConfettiStore().onOpen;
	const [isLoading, setIsLoading] = useState(false);

	const onClick = async () => {
		try {
			setIsLoading(true);

			if (isPublished) {
				await axios.patch(`/api/courses/${courseId}/unpublish`);
				toast.success("Kurs Yayından Kaldırıldı.");
			} else {
				await axios.patch(`/api/courses/${courseId}/publish`);
				toast.success("Kurs Başarıyla Yayınlandı.");
				onOpen();
			}

			router.refresh();
		} catch {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		} finally {
			setIsLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setIsLoading(true);

			await axios.delete(`/api/courses/${courseId}`);

			toast.success("Kurs Başarıyla Silindi");
			router.refresh();
			router.push(`/teacher/courses`);
		} catch {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center gap-x-2">
			<Button
				onClick={onClick}
				disabled={disabled || isLoading}
				variant="outline"
				size="sm"
			>
				{isPublished ? "Kursu Yayından Kaldır" : "Kursu Yayınla"}
			</Button>
			<ConfirmModal
				onConfirm={onDelete}
				title="Kursu Silmek İstediğinize Emin misiniz?"
				description={
					<p>
						Bu işlem, <strong>kursu</strong> kalıcı olarak silecektir ve işlem geri alınamaz.
					</p>
				}
			>
				<Button
					size="sm"
					disabled={isLoading}
					variant={"destructive"}
				>
					<Trash className="h-4 w-4" />
				</Button>
			</ConfirmModal>
		</div>
	);
};
