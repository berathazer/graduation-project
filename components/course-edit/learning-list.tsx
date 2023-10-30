"use client";

import { CourseLearningOutcome } from "@prisma/client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Grip, XCircle, RotateCw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { strokeWidth } from "@/lib/constant";

interface LearningListProps {
	items: CourseLearningOutcome[];
	onReorder: (updateData: { id: string; position: number }[]) => void;
	//onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	deletingId: string | undefined;
}

export const LearningList = ({ items, onReorder, onDelete, deletingId }: LearningListProps) => {
	const [isMounted, setIsMounted] = useState(false);
	const [outcomeList, setOutcomeList] = useState(items);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		setOutcomeList(items);
	}, [items]);

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(outcomeList);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		const startIndex = Math.min(result.source.index, result.destination.index);
		const endIndex = Math.max(result.source.index, result.destination.index);

		const updatedChapters = items.slice(startIndex, endIndex + 1);

		setOutcomeList(items);

		
		const bulkUpdateData = updatedChapters.map((chapter) => ({
			id: chapter.id,
			position: items.findIndex((item) => item.id === chapter.id),
		}));
		onReorder(bulkUpdateData);
	};

	if (!isMounted) {
		return null;
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="chapters">
				{(provided) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{outcomeList.map((outcome, index) => (
							<Draggable
								key={outcome.id}
								draggableId={outcome.id}
								index={index}
							>
								{(provided) => (
									<div
										className={cn(
											"flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm"
										)}
										ref={provided.innerRef}
										{...provided.draggableProps}
									>
										<div
											className={cn(
												"px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
											)}
											{...provided.dragHandleProps}
										>
											<Grip
												className="h-6 w-6"
												strokeWidth={strokeWidth}
											/>
										</div>
										{outcome.outcomeText}
										<div className="ml-auto pr-2 flex items-center gap-x-2">
											<Badge className={cn("bg-slate-500")}>{outcome.order+1}</Badge>
											{outcome.id === deletingId ? (
												<RotateCw className="w-6 h-6 animate-spin" />
											) : (
												<XCircle
													onClick={() => onDelete(outcome.id)}
													strokeWidth={strokeWidth}
													className="w-6 h-6 cursor-pointer hover:opacity-75 transition text-rose-400"
												/>
											)}
										</div>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
