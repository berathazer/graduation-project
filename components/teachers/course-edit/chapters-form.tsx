"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Course } from "@prisma/client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { ChaptersList } from "./chapters-list";
import { CourseWithCategoryWithChapters } from "@/types/global.types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChaptersFormProps {
	initialData: CourseWithCategoryWithChapters | null;
	courseId: string;
}

const formSchema = z.object({
	title: z.string().min(1),
});

export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);

	const toggleCreating = () => {
		setIsCreating((current) => !current);
	};

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	const { isSubmitting, isValid } = form.formState;

	/* Form Submit olduğunda rotaya post isteğiyle bölüm başlığını gönderiyorum */
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.post(`/api/courses/${courseId}/chapters`, values);
			toast.success("Bölüm Oluşturuldu");
			toggleCreating();
			form.reset();
			router.refresh();
		} catch (error: any) {
			if (error.response.data.message) {
				return toast.error(error.response.data.message);
			}
			toast.error("Beklenmeyen Bir Hata Oluştu");
		}
	};

	const onReorder = async (updateData: { id: string; position: number }[]) => {
		try {
			setIsUpdating(true);

			await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
				list: updateData,
			});
			toast.success("Bölümler Düzenlendi");
			router.refresh();
		} catch {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		} finally {
			setIsUpdating(false);
		}
	};

	const onEdit = (id: string) => {
		router.push(`/teacher/courses/${courseId}/chapters/${id}`);
	};

	return (
		<div className="relative mt-6 border bg-slate-100 rounded-md py-4">
			{isUpdating && (
				<div className="absolute z-[999] h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
					<Loader2 className="animate-spin h-6 w-6 text-sky-700" />
				</div>
			)}
			<div className="px-4 font-medium flex items-center justify-between">
				<span className="flex items-center gap-x-2">
					Kurs Bölümleri
					{initialData?.chapters.filter((c) => c.isPublished === true).length! > 0 ? (
						<Check className="w-5 h-5 text-green-600" />
					) : (
						"*"
					)}
				</span>
				<Button
					onClick={toggleCreating}
					variant="ghost"
				>
					{isCreating ? (
						<>İptal</>
					) : (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Bölüm Ekleyin
						</>
					)}
				</Button>
			</div>

			{isCreating && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4 p-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. 'Introduction to the course'"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={!isValid || isSubmitting}
							type="submit"
						>
							Oluştur
						</Button>
					</form>
				</Form>
			)}
			{!isCreating && (
				<ScrollArea
					className={cn(
						"text-sm mt-2 px-4  ",
						!initialData?.chapters.length && "text-slate-500 italic",
						initialData?.chapters.length && initialData?.chapters.length > 4
							? "h-[300px]"
							: "h-max"
					)}
				>
					{!initialData?.chapters.length && "Hiç Bölüm Yok"}
					<ChaptersList
						onEdit={onEdit}
						onReorder={onReorder}
						items={initialData?.chapters || []}
					/>
				</ScrollArea>
			)}
			{!isCreating && (
				<p className="text-xs text-muted-foreground mt-4 px-4">
					Bölümleri sürükleyerek sıralayın.
				</p>
			)}
		</div>
	);
};
