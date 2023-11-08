"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CourseFeature, Difficulty } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
	difficulty: z.string({
		required_error: "Please select an difficulty to display.",
	}),
});

interface DiffcultyFormProps {
	initialData?: CourseFeature | null;
	courseId?: string | null;
	featureId?: string | null;
}

export function DifficultyForm({ courseId, featureId, initialData }: DiffcultyFormProps) {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/courses/${courseId}/feature/${featureId}`, values);
			toast.success("Kurs Güncellendi");
			toggleEdit();
			router.refresh();
		} catch {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		}
	};

	const difficulties = Object.values(Difficulty);
	const turkishDiffs = {
		[Difficulty.Beginner]: "Başlangıç Seviyesi",
		[Difficulty.Intermediate]: "Orta Seviye",
		[Difficulty.Advanced]: "İleri Seviye",
	};
	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Kursun Zorluğu
				<Button
					onClick={toggleEdit}
					variant="ghost"
				>
					{isEditing ? (
						<>İptal</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Açıklamayı Düzenle
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<div
					className={cn("text-sm mt-2", !initialData?.description && "text-slate-500 italic")}
				>
					{!initialData?.difficulty && "Zorluk Seçilmedi"}
					{initialData?.difficulty && <>{turkishDiffs[initialData.difficulty]}</>}
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
							name="difficulty"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Kurs için bir zorluk seviyesi belirleyin" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{difficulties.map((difficulty, index) => (
													<SelectItem
														key={index}
														value={difficulty}
													>
														{turkishDiffs[difficulty]}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
}
