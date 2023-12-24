"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface CourseSidebarItemProps {
	label: string;
	id: string;
	isCompleted: boolean;
	courseId: string;
	isLocked: boolean;
}

export const CourseSidebarItem = ({
	label,
	id,
	isCompleted,
	courseId,
	isLocked,
}: CourseSidebarItemProps) => {
	const pathname = usePathname();

	const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
	const isActive = pathname?.includes(id);

	return (
		<Link
			/* onClick={onClick} */
			href={`/learning/${courseId}/chapters/${id}`}
			className={cn(
				"flex w-full h-full flex-1 items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
				isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
				isCompleted && "text-emerald-700 hover:text-emerald-700",
				isCompleted && isActive && "bg-emerald-200/20"
			)}
		>
			<div className="flex items-center gap-x-2 py-4">
				<Icon
					size={22}
					className={cn(
						"text-slate-500",
						isActive && "text-slate-700",
						isCompleted && "text-emerald-700"
					)}
				/>
				<span>{label.length > 30 ? `${label.slice(0, 30)}...` : label}</span>
			</div>
			<div
				className={cn(
					"flex-shrink-0 opacity-0  border-2 border-slate-700 transition-all ml-auto min-h-[60px]",
					isActive && "opacity-100",
					isCompleted && "border-emerald-700"
				)}
			/>
		</Link>
	);
};
