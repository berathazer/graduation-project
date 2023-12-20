"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti";

interface VideoPlayerProps {
	playbackId: string;
	courseId: string;
	chapterId: string;
	nextChapterId?: string;
	isLocked: boolean;
	completeOnEnd: boolean;
	title?: string;
}

export const VideoPlayer = ({
	playbackId,
	courseId,
	chapterId,
	nextChapterId,
	isLocked,
	completeOnEnd,
	title,
}: VideoPlayerProps) => {
	const [isReady, setIsReady] = useState(false);
	const router = useRouter();
	const confetti = useConfettiStore();

	const onEnd = async () => {
		try {
			if (completeOnEnd) {
				await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
					isCompleted: true,
				});

				if (!nextChapterId) {
					confetti.onOpen();
				}

				toast.success("Progress updated");
				router.refresh();

				if (nextChapterId) {
					router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
				}
			}
		} catch {
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="relative aspect-video  rounded-lg px-0 lg:px-12 xl:px-20">
			{!isLocked && !isReady && (
				<div className="absolute left-0 right-0 md:left-20 md:right-20 bottom-0 md:bottom-20  max-h-[570px] md:max-h-none top-0 flex items-center justify-center bg-slate-800 rounded-lg ">
					<Loader2 className="h-8 w-8 animate-spin text-secondary" />
				</div>
			)}
			{isLocked && (
				<div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary rounded-lg">
					<Lock className="h-8 w-8" />
					<p className="text-sm">This chapter is locked</p>
				</div>
			)}
			{!isLocked && (
				<div className="rounded-lg h-max overflow-hidden bg-black p-0">
					<MuxPlayer
						title={title}
						className={cn(!isReady && "hidden ")}
						onCanPlay={() => setIsReady(true)}
						onEnded={onEnd}
						autoPlay
						playbackId={playbackId}
					/>
				</div>
			)}
		</div>
	);
};
