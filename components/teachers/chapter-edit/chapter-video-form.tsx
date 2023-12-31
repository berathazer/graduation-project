"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import MuxPlayer from "@mux/mux-player-react";

interface ChapterVideoFormProps {
	initialData: Chapter & { muxData?: MuxData | null };
	courseId: string;
	chapterId: string;
}

const formSchema = z.object({
	videoUrl: z.string().min(1, {
		message: "Bölümü oluşturmak için video gereklidir",
	}),
});

export const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoFormProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
			toast.success("Bölüm Güncellendi");
			toggleEdit();
			router.refresh();
		} catch {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		}
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Bölüm Videosu
				<Button
					onClick={toggleEdit}
					variant="ghost"
				>
					{isEditing && <>İptal</>}
					{!isEditing && !initialData.videoUrl && (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Video Ekleyin
						</>
					)}
					{!isEditing && initialData.videoUrl && (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Videoyu Değiştirin
						</>
					)}
				</Button>
			</div>
			{!isEditing &&
				(!initialData.videoUrl ? (
					<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
						<Video className="h-10 w-10 text-slate-500" />
					</div>
				) : (
					<div className="relative aspect-video mt-2">
						<MuxPlayer
							playbackId={initialData.muxData?.playbackId || ""}
							metadata={{
								video_id: initialData.muxData?.id,
								video_title: initialData.title,
								viewer_user_id: initialData.id,
							}}
							streamType="on-demand"
						/>
					</div>
				))}
			{isEditing && (
				<div>
					<FileUpload
						endpoint="chapterVideo"
						onChange={(url) => {
							if (url) {
								onSubmit({ videoUrl: url });
							}
						}}
					/>
					<div className="text-xs text-muted-foreground mt-4">
						Bu bölüme bir video ekleyin.
					</div>
				</div>
			)}

			{initialData.videoUrl && !isEditing && (
				<div className=" text-xs text-muted-foreground mt-2">
					Videoların işlenmesi biraz zaman alabilir. Eğer video görünmezse sayfayı yenileyin.{" "}
				</div>
			)}
		</div>
	);
};
