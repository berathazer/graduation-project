"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseLearningOutcome } from "@prisma/client";
import { without_focus } from "@/lib/constant";
import { LearningList } from "./learning-list";

interface LearningOutcomeFormProps {
	initialData: CourseLearningOutcome[] | undefined;
	courseId: string | undefined;
}

const formSchema = z.object({
	outcomeText: z.string().min(3, {
		message: "Madde metni en az 3 karakter olmalıdır",
	}),
});

export const LearningOutcomeForm = ({ initialData, courseId }: LearningOutcomeFormProps) => {
	const router = useRouter();
	const [isEditing, setIsEditing] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [deletingId, setDeletingId] = useState<string | undefined>("");

	const toggleEdit = () => setIsEditing((current) => !current);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			outcomeText: "",
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.post(`/api/courses/${courseId}/outcome`, values);
			toast.success("Outcome Güncellendi");
			toggleEdit();
			form.reset();
			router.refresh();
		} catch {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		}
	};

	const onReorder = async (updateData: { id: string; position: number }[]) => {
		try {
			setIsUpdating(true);

			await axios.put(`/api/courses/${courseId}/outcome/reorder`, {
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

	const onDelete = async (id: string) => {
		try {
			setDeletingId(id);
			await axios.delete(`/teacher/courses/${courseId}/outcome/${id}`);
			toast.success("Outcome başarıyla silindi.");
		} catch (error) {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		} finally {
			setDeletingId("");
		}
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Kursta Öğretilecekler
				<Button
					onClick={toggleEdit}
					variant="ghost"
				>
					{isEditing ? (
						<>İptal</>
					) : (
						<>
							<Plus className="h-4 w-4 mr-2" />
							Madde Ekle
						</>
					)}
				</Button>
			</div>

			{!isEditing && (
				<div className="text-sm mt-4">
					<LearningList
						onDelete={onDelete}
						onReorder={onReorder}
						items={initialData || []}
						deletingId={deletingId}
					/>
				</div>
			)}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="outcomeText"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="ÖRN: 'Bu kurs bitince ...'yı öğreniceksiniz.'"
											{...field}
											className={without_focus}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Button
								disabled={!isValid || isSubmitting}
								type="submit"
							>
								Kaydet
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};
